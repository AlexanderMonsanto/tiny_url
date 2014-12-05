"use strict";

module.exports = function(sequelize, DataTypes) {
  var Url = sequelize.define("Url", {
    wholeurl: DataTypes.STRING,
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
