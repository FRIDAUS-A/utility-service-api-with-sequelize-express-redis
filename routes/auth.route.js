const express = require('express')
const { loginCustomer } = require("../controllers/auth.controller")
const authRouter = express.Router()

authRouter.route('/login').post(loginCustomer)

module.exports = authRouter