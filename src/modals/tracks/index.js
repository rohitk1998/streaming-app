const { Sequelize, DataTypes } = require('sequelize');
const db = require("../../config/db")

const Tracks = db.define('Tracks', {
  // Model attributes are defined here
  track_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  track_title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique : true 
  },
  track_path : {
    type: DataTypes.STRING,
    unique : true ,
    // allowNull defaults to true
  },
  artist_name : {
    type: DataTypes.STRING,
  },
  artist_id : {
    type: DataTypes.STRING,
  },
  year : {
    type : DataTypes.STRING
  }
}, {
  // Other model options go here
  timestamps : true  , 
} , { tableName  : "tracks" });

db.sync({ alter: true })

module.exports = Tracks ; 