

const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require('../config/db.config')


const TemporaryCustomers = sequelize.define("TemporaryCustomer", 
    {
    customerId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    othernames: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false

    },
},{
  timestamps: false,
})


module.exports = { TemporaryCustomers }