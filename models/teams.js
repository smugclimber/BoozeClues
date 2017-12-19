
//A Game has many Teams and a Team has many Users and a User has many Teams
module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Team.associate = function(models) {
    Team.belongsToMany(models.Users, {
      through: 'TeamUsers'
    });

    Team.hasOne(models.Score, {
      onDelete: "cascade"
    });

    Team.belongsTo(models.Game)
      foreignKey: {
        allowNull: false
      }
  };

  return Team;
};
