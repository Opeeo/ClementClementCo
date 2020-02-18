'use strict';
module.exports = (sequelize, DataTypes) => {
  const Addfriend = sequelize.define('Addfriend', {
    idUser: DataTypes.INTEGER,
    idFriend: DataTypes.INTEGER
  }, {});
  Addfriend.associate = function(models) {
    // associations can be defined here
    models.Addfriend.belongTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Addfriend;
};