module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		picUrl: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		pass: {
			type: DataTypes.STRING,
			allowNull: false
		},
		access: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0
		},
	});

	return User;
}