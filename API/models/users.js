'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    pathPP: DataTypes.STRING,
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    idStatus: DataTypes.INTEGER,
    createAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    models.Users.hasMany(models.Pictures);
    models.Users.hasMany(models.Comments);
    models.Users.hasMany(models.Likespictures);
    models.Users.hasMany(models.Reportspictures);
    models.Users.hasMany(models.Likescomments);
    models.Users.hasMany(models.Reportscomments);
    models.Users.hasMany(models.Addfriend);

    models.Users.belongTo(models.Statues, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Users;
};