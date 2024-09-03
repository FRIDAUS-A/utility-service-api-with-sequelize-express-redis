const express = require('express')
const customerRouter = express.Router()
const {
	createCustomer,
	sendOtp,
	verifyEmail,
	getCustomer,
	updateCustomer
} = require('../controllers/customer.controller')

const { authMiddleware } = require("../middleware/auth")

customerRouter.route('/').post(createCustomer).get(authMiddleware, getCustomer).patch(authMiddleware, updateCustomer)
customerRouter.route('/send-otp').get(sendOtp)
customerRouter.route('/verify-email').get(verifyEmail)

module.exports = customerRouter