const { Sequelize, DataTypes } = require('sequelize');
const db = require("../../config/db")
const Tracks = require("../tracks/index")

const Artists = db.define('artist', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  followers: {
    type: DataTypes.JSON,
  },
  genres: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  images : {
    type : DataTypes.ARRAY(DataTypes.JSON),
  },
  name : {
    type : DataTypes.STRING,
  },
  popularity : {
    type: DataTypes.BIGINT
  },
  type :{
    type: DataTypes.STRING,
  },
  external_links:{
    type: DataTypes.JSON,
  },
  verified:{
    type: DataTypes.BOOLEAN,
  },
  uri : {
    type: DataTypes.STRING,
    unique : true ,
  }
}, {
  timestamps : true  , 
} , { tableName  : "artists" });

// db.sync({ alter: true })

module.exports = Artists ; 