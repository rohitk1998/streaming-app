const { Sequelize, DataTypes } = require('sequelize');
const db = require("../../config/db")

const Tracks = db.define('tracks', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  allbum : {
    type: DataTypes.JSON,
  },
  artist : {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  avialable_market : {
    type : DataTypes.STRING
  },
  duration : {
    type : DataTypes.BIGINT
  },
  external_urls:{
    type : DataTypes.ARRAY(DataTypes.JSON)
  },
  is_local : {
    type : DataTypes.BOOLEAN
  },
  popularity : {
    type : DataTypes.BIGINT
  },
  preview_url  : {
    type : DataTypes.STRING
  },
  number : {
    type : DataTypes.BIGINT
  },
  type : {
    type : DataTypes.STRING
  },
  uri : {
    type: DataTypes.STRING,
    unique : true
  }
}, {
  timestamps : true  , 
} , { tableName  : "tracks" });

// db.sync({ alter: true })

module.exports = Tracks ; 