module.exports = {
  attributes: {
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },
  associations: function() {
    Rank.belongsTo(Taxi, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  },
};
