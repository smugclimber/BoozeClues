//A Game has many Teams and a Team has many Users
var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    }
  },
  {
    classMethods: {
      validPassword: function(password, passwd, done, user){
        bcrypt.compare(password, passwd, function(err, isMatch){
          if(err) console.log(err)
          if(isMatch){
            return done(null,user)
          }else{
            return done(null, false)
          }
        });
      }
    }
  },
{
  dialect: 'mysql'
}
);
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
User.associate = function(models) {
  // Associating User with Games
  // When an User is deleted, also delete any associated Games
  User.hasMany(models.Game, {
    onDelete: "cascade"
  });
  // User.belongsToMany(models.Team, {
  //   foreignKey: {
  //     allowNull: false
  //   },
  //   through: 'UserTeams'
  // })
};
return User

};
// };
//   User.prototype.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
//   };
//   User.hook("beforeCreate", function(user) {
//     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
//   });
//   return User;
// };




//   return User;
// };
