/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    plate_no : {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  },
  associations: function() {
    Taxi.hasMany(Rank);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
