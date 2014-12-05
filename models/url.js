"use strict";

module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define("Url", {


    wholeurl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Please type in a url"},
        isUrl: { msg: "Please type in url format"}
      }
    },
    tinyurl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Url;
};
