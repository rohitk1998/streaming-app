const { Sequelize, DataTypes } = require('sequelize');
const db = require("../../config/db")

const User = db.define('user', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique : true
  },
  email: {
    type: DataTypes.STRING,
    unique : true ,
    validate : {
      isEmail : {
        args : true , 
        msg : "Incorrect email"
      }
    }
  },
  contact : {
    type : DataTypes.STRING,
    unique : true
  },
  bio: {
    type: DataTypes.STRING,
  },
  profile : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password : {
    type: DataTypes.STRING,
  },
  device_token : {
    type: DataTypes.STRING
  },
  device_type : {
    type: DataTypes.STRING
  },
  type:{
    type: DataTypes.STRING,
  },
  remember_token:{
    type: DataTypes.STRING,
  },
  notifications:{
    type: DataTypes.STRING,
  }
}, {
  timestamps : true  , 
} , { tableName  : "users" });

// db.sync({ alter: true })

module.exports = User ; 