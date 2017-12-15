//A Game has many Teams and a Team has many Users and a User has many Teams
module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    user_key: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    game_key: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    num_corr: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_ques: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scor_val: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Score.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Score.belongsTo(models.teams, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Score;
};
