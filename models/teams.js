<<<<<<< HEAD
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
=======
module.exports = function(sequelize, DataTypes){
	var Team = sequelize.define("Team", {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		users: {
			type: DataTypes.STRING,
			allowNull: false
		},
		score: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	});

	Team.associate = function(models) {
>>>>>>> 9c6853cc82e4775fc38ae23bcb7f97c0208b06cb
    Team.belongsTo(models.games, {
      foreignKey: {
        allowNull: false
      }
    });
  };
<<<<<<< HEAD
  return Game;
};
=======
	return Team;
}
>>>>>>> 9c6853cc82e4775fc38ae23bcb7f97c0208b06cb
