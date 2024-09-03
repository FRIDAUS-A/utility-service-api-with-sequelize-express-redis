const { Sequelize } = require('sequelize')
const database = process.env.DATABASE
const username = process.env.USERNAME
const password = process.env.PASSWORD
const host = process.env.HOST
const dialect = process.env.DIALECT

const sequelize = new Sequelize(database, username, password,  {
	host: host,
	dialect: dialect,
	dialectOptions: {
		ssl: {
		  require: 'true'
		}
	  }
});

module.exports = sequelize