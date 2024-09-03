const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require('../config/db.config')


const Services = sequelize.define("Service", 
    {
    service_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    service_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
      type: DataTypes.STRING,
    
    },
    modified_at: {
      type: DataTypes.STRING
    }

},{
  timestamps: true
})


module.exports = { Services }