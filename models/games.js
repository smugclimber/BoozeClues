
//A Game has many Users and a User has one game
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
        },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });

  Game.associate = function(models) {
    // Associating Users with Game
    // When an Game is deleted, also delete any associated Users
    Game.hasMany(models.User, {
      onDelete: "cascade"
    });
  };
  return Game;
};
