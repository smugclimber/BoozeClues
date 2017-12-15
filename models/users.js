//A Game has many Teams and a Team has many Users and a User has many Teams
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
    access: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
});

  // User.hasMany(models.teams, {
  //   onDelete: "CASCADE",
  //   foreignKey: {
  //     allowNull: true
  //   }
  // })
  User.associate = function(models) {
    User.belongsToMany(models.Team, {
      foreignKey: {
        allowNull: false
      },
      through: 'UserTeams'
    })
  };

  return User;
};
