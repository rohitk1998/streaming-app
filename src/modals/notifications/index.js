const { Sequelize, DataTypes } = require('sequelize');
const db = require("../../config/db")

const Notifications = db.define('notification', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.BIGINT,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data : {
    type: DataTypes.STRING,
  },
  is_seen : {
      type : DataTypes.BOOLEAN
  }
}, {
  timestamps : true  , 
} , { tableName  : "notifications" });

// db.sync({ alter: true })


module.exports = Notifications ; 