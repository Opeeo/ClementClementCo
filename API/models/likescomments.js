'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likescomments = sequelize.define('Likescomments', {
    idComment: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {});
  Likescomments.associate = function(models) {
    // associations can be defined here
    models.Likescomments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Likescomments.belongsTo(models.Comments, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Likescomments;
};