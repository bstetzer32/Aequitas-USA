'use strict';
module.exports = (sequelize, DataTypes) => {
  const Highlight = sequelize.define('Highlight', {
    citizenId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    problemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['citizenId', 'problemId'] 
      }
    ]
  });
  Highlight.associate = function(models) {
    // associations can be defined here
    Highlight.belongsTo(models.User, {
      foreignKey: "citizenId"
    })
    Highlight.belongsTo(models.Problem, {
      foreignKey: "problemId"
    })
  };
  return Highlight;
};