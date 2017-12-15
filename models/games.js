
module.exports = function(sequelize, DataTypes){
	var Game = sequelize.define("Game", {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	});

	Game.associate = function(models) {
    Game.hasMany(models.Team, {
      onDelete: "cascade"
    });
  };
	return Game;
}

