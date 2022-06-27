const { Sequelize, DataTypes } = require('sequelize');
const db = require("../../config/db")

const Allbums = db.define('allbums', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  artists: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  avialable_markets : {
    type : DataTypes.ARRAY(DataTypes.JSON),
  },
  copy_rights: {
    type : DataTypes.ARRAY(DataTypes.JSON),
  },
  images : {
    type : DataTypes.ARRAY(DataTypes.JSON),
  },
  label : {
    type : DataTypes.STRING,
  },
  name : {
    type : DataTypes.STRING,
  },
  popularity : {
    type: DataTypes.STRING
  },
  release_date:{
    type: DataTypes.STRING,
  },
  total_tracks:{
    type: DataTypes.BIGINT,
  },
  type:{
    type: DataTypes.STRING,
  },
  uri : {
    type: DataTypes.STRING,
    unique : true ,
  }
}, {
  timestamps : true  , 
} , { tableName  : "allbums" });

// db.sync({ force: true })

module.exports = Allbums ; 