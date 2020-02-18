'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likespictures = sequelize.define('Likespictures', {
    idPicture: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {});
  Likespictures.associate = function(models) {
    // associations can be defined here
    models.Likespictures.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Likespictures.belongsTo(models.Pictures, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Likespictures;
};