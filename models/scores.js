//A Game has many Teams and a Team has many Users and a User has many Teams
module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    num_corr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    total_ques: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    scor_val: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    game_vic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Score.associate = function(models) {
    // We're saying that a Score should belong to an Team
    // A Score can't be created without an Team due to the foreign key constraint
    Score.belongsTo(models.Team, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Score;
};
