//A Game has many Teams and a Team has many Users and a User has many Teams
module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });


  Team.associate = function(models) {
    // Associating Score with Team
    // When an Team is deleted, also delete any associated Scores
    Team.hasOne(models.Score, {
      onDelete: "cascade"
    });

  };

  // Team.associate = function(models) {
  //   Team.belongsToMany(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     },
  //     through: 'TeamUsers'
  //   })
  // };
  return Team;
};
