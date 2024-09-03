const {Sequelize, DataTypes, DATE} = require("sequelize")
const sequelize = require('../config/db.config')


const Otp = sequelize.define("Otp", 
    {
    otpId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerId: {
		type: DataTypes.STRING,
		allowNull: false,
		references:{
		  model: 'TemporaryCustomers',
		  key: 'customerId',
		}
	},
    otp: {
      type: DataTypes.STRING,
      allowNull: false
    },
	expireAt: {
		type: DataTypes.DATE,
		defaultValue: () => {
			return new Date(Date.now() + 60 * 1000)
		}
	}
},{
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false 
})


module.exports = { Otp }