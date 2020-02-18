'use strict';
module.exports = (sequelize, DataTypes) => {
  const Statues = sequelize.define('Statues', {
    nameStatus: DataTypes.STRING
  }, {});
  Statues.associate = function(models) {
    // associations can be defined here
    models.Statues.hasMany(models.Users);
  };
  return Statues;
};