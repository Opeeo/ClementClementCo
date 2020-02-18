'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    comment: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    idPicture: DataTypes.INTEGER
  }, {});
  Comments.associate = function(models) {
    // associations can be defined here
    models.Comments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Comments.belongsTo(models.Pictures, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Comments.hasMany(models.Likescomments);
    models.Comments.hasMany(models.Reportscomments);
  };
  return Comments;
};