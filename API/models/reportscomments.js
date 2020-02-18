'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reportscomments = sequelize.define('Reportscomments', {
    idComment: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {});
  Reportscomments.associate = function(models) {
    // associations can be defined here
    models.Reportscomments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Reportscomments.belongsTo(models.Comments, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Reportscomments;
};