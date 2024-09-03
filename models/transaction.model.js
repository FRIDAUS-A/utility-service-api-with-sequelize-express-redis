

const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require('../config/db.config')


const Transactions = sequelize.define("Transaction", 
    {
    transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    walletId: {
        type: DataTypes.STRING,
        allowNull: true,
        /*
            we need to add a reference to the wallet table but we 
            decided to allow the wallet id to be null
            should in case other customer wants to make a 
            transaction without a wallet. So whne the wallet id is null
            we can assume that the customer is making a transaction without a wallet
            using others payment methods
        */
    },
    customerId: {
		type: DataTypes.STRING,
		allowNull: false,
		references:{
		  model: 'Customers',
		  key: 'customerId'
		}
        /**
         * we need to add a reference to the customer table
         * so that we can easily get the customer details
         * but we decided to allow the email because
         * we can have a transaction without a customer id but
         * have the email of the customer instead
         */
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    transactionType: {
        type: DataTypes.ENUM,
        values: ['credit', 'debit'],
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'completed', 'failed'],
        defaultValue: 'pending'
    },
    service: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentMeans: {
        type: DataTypes.ENUM,
        values: ['wallet', 'others']
    },
    paymentReference: {
        type: DataTypes.STRING,
        allowNull: true
    },
},{
  timestamps: true,
})


module.exports = { Transactions }