
//A Game has many Teams and a Team has many Users
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    pic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [6]
    },
    game_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    corr_ans: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    game_vics: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    access: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  User.associate = function(models) {
    // Associating User with Games
    // When an User is deleted, also delete any associated Games
    User.hasMany(models.games, {
      onDelete: "cascade"
    });
  };

  return User;
};

