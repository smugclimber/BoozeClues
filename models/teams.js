
//A Game has many Teams and a Team has many Users and a User has many Teams
module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Team.associate = function(models) {
    Team.belongsToMany(models.User, {
      through: 'TeamUsers'
    });

    Team.hasOne(models.Score, {
      onDelete: "cascade"
    });

    Team.belongsTo(models.Game)
  };

  return Team;
};
