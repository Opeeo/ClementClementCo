'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pictures = sequelize.define('Pictures', {
    path: DataTypes.STRING,
    description: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {});
  Pictures.associate = function(models) {
    // associations can be defined here
    models.Pictures.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Pictures.hasMany(models.Comments);
    models.Pictures.hasMany(models.Likespictures);
    models.Pictures.hasMany(models.Reportspictures);
    
  };
  return Pictures;
};