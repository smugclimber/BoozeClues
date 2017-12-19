
//A Game has many Users and a User has one game
var bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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

  },
{
  dialect: 'mysql'
});

User.associate = function(models) {
    User.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
  });
};

User.prototype.validPassword = function(password){
        console.log("here")
          return bcrypt.compareSync(password, this.password)

      }
User.prototype.hashPassword = function() {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));

}

User.hook('beforeCreate', function(user){
  user.hashPassword();

})
return User
};
