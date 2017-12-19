
//A Game has many Teams and a Team has many Users
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
User.associate = function(models) {
  // Associating User with Games
  // When an User is deleted, also delete any associated Games
    User.belongsToMany(models.Team, {
       through: 'TeamUsers'
    })
  // User.belongsToMany(models.Team, {
  //   foreignKey: {
  //     allowNull: false
  //   },
  //   through: 'UserTeams'
  // })
};
return User
};
