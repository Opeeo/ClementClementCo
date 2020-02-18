'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reportspictures = sequelize.define('Reportspictures', {
    idPicture: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {});
  Reportspictures.associate = function(models) {
    // associations can be defined here
    models.Reportspictures.belongTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Reportspictures.belongTo(models.Pictures, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Reportspictures;
};