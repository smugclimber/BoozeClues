//A Game has many Teams and a Team has many Users and a User has many Teams
module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Team.associate = function(models) {
    // Associating Users with a Team
    // When an User is deleted, also delete any associated Games
    Team.hasMany(models.users, {
      onDelete: "cascade"
    });
  };

  Team.associate = function(models) {
    // We're saying that a Team should belong to one Game
    // A Team can't be created without a Game due to the foreign key constraint
    Team.belongsTo(models.games, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Game;
};
