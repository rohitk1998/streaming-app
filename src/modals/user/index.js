const { Sequelize, DataTypes } = require('sequelize');
const db = require("../../config/db")

const User = db.define('User', {
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
        msg : "email is invalid"
      }
    }
  },
  user_profile : {
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
  user_type:{
    type: DataTypes.STRING
  }
}, {
  timestamps : true  , 
} , { tableName  : "user" });

db.sync({ alter: true })

module.exports = User ; 