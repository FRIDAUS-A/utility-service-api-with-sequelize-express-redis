

const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require('../config/db.config')


const Wallets = sequelize.define("Wallet", 
    {
    walletId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    customerId: {
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: 'Customers',
            key: 'customerId'
          }
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
    },
},{
  timestamps: true
})


module.exports = { Wallets }