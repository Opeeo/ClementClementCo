'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reportspictures = sequelize.define('Reportspictures', {
    idPicture: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {});
  Reportspictures.associate = function(models) {
    // associations can be defined here
    models.Reportspictures.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Reportspictures.belongsTo(models.Pictures, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Reportspictures;
};