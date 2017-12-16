//A Game has many Teams and a Team has many Users and a User has many Teams
var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    pic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  dialect: 'mysql'

  User.hook('beforeCreate', function(user, fn){
    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
      return salt
    });
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password =hash;
      return fn(null, user)
    });
  })

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

//   User.prototype.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
//   };
//   User.hook("beforeCreate", function(user) {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
//   });
//   return User;
// };
