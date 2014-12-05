var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models/index.js');
var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
  res.render('index')
});

app.post("/create", function(req, res){
  db.Url.create({"wholeurl": req.body.fullurl}).done(function(err,data){
    if(err){
      var errorMsg = {msg: err.errors[0].message};
      res.render('create', { errorMsg: errorMsg});

      return;}
    var hashdata = hashids.encode(data.id);
    console.log(hashdata);
    data.tinyurl = hashdata;
    data.save().done(function(error, data){
      res.render('create', {data: data});
   })
  })
});

app.get("/:tinyurl", function(req, res){
  db.Url.find({ where: {tinyurl: req.params.tinyurl } }).done(function(error, data){
    res.redirect("Http://" + data.wholeurl);
  })
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Ready to work")
});
