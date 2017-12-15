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
    Team.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
    });
  };
	return Team;
}