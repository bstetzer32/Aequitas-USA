'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leaderships = sequelize.define('Leaderships', {
    citizen_id: DataTypes.INTEGER,
    office_id: DataTypes.INTEGER,
    leader_id: DataTypes.INTEGER
  }, {});
  Leaderships.associate = function(models) {
    // associations can be defined here
    Leaderships.belongsTo(models.Users, {
      foreignkey: "citizen_id",
      as: "citizen"
    })
    Leaderships.belongsTo(models.Users, {
      foreignkey: "citizen_id",
      as: "leader"
    })
    Leaderships.belongsTo(models.Offices, {
      foreignkey: "office_id",
      as: "office"
    })
  };
  return Leaderships;
};