const { Sequelize } = require('sequelize');
require('dotenv').config()

const db = new Sequelize(process.env.DB_SERVER, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}
});

module.exports = db ; 