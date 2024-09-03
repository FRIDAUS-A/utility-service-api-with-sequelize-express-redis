const { v4: uuidv4 } = require("uuid")
const { BadRequest } = require("../errors")
const { Customers } = require("../models/customer.model")
const { hashPassword, generateOtp } = require("../utils")
const { createCustomerValidation, otpValidation, emailValidation } = require("../validation/customer.validation")
const { TemporaryCustomers } = require("../models/customer_temp.model")
const { Otp } = require("../models/otp.model")
const { StatusCodes } = require("http-status-codes")
const { Wallets } = require("../models/wallet.model")


const createCustomer = async (req, res) => {
	const { surname, othernames, email, password, phone } = req.body

	const { error } = createCustomerValidation(req.body)


	if (error) throw new BadRequest(error.message)

	const checkIfEmailExist = await Customers.findOne({
		where: {email: email}
	})
	if (checkIfEmailExist) {
		throw new BadRequest("Customer with this email exists")
	}
	// hash the password
	const passwordHash = await hashPassword(password)
	


	// create a temporary customer
	const customer = await TemporaryCustomers.create({
		customerId: uuidv4(),
		surname: surname,
		othernames: othernames,
		email: email,
		phone: phone,
		password: passwordHash
	})
	customer.save()
	res.status(201).json({
		msg: "customer has been created",
		status: "success"
	})
}

const sendOtp = async (req, res) => {
	const { email } = req.query
	
	const { error } = emailValidation(req.query)


	if (error) throw new BadRequest(error.message)
	
	const customer = await TemporaryCustomers.findOne({
		where: {email: email}
	})
	if (!customer) {
		throw new BadRequest("User with this email does not exist")
	}
	// generate otp
	otpValue = generateOtp()
	// send otp using nodemailer

	// delete all the previous otps
	await Otp.destroy({
		where: {customerId: customer.customerId}
	})
	const otp = await Otp.create({
		otp: otpValue,
		customerId: customer.customerId
	})
	otp.save()
	res.status(StatusCodes.OK).json({
		message: "Otp sent successfully"
	})
}
const verifyEmail = async (req, res) => {
	const { email, otpValue } = req.query

	const { error } = otpValidation(req.query)

	if (error) throw new BadRequest(error.message)
	const customer = await TemporaryCustomers.findOne({
		where: {email: email}
	})
	if (!customer) {
		throw new BadRequest("User with this email does not exist")
	}

	// the otp linked to the customer

	const otp = await Otp.findOne({
		where: {customerId: customer.customerId}
	})
	if (otp.otp !== otpValue) {
		throw new BadRequest("Invalid Otp")
	}
	if (otp.expireAt < new Date()) {
		await Otp.destroy({
			where: {otpId: otp.otpId}
		})
		throw new BadRequest("Expired Otp")
	}
	const verifiedCustomer = await Customers.create({
		customerId: customer.customerId,
		surname: customer.surname,
		othernames: customer.othernames,
		email: customer.email,
		phone: customer.phone,
		isEmailVerified: true,
		password: customer.password
	})
	verifiedCustomer.save()	
	await Wallets.create({
		walletId: uuidv4(),
		customerId: verifiedCustomer.customerId,
	})
	// delete all the otps after verification
	await Otp.destroy({
		where: {customerId: verifiedCustomer.customerId}
	})

	// delete the temporary customer table
	await TemporaryCustomers.destroy({
		where: {customerId: verifiedCustomer.customerId}
	})
	res.status(StatusCodes.OK).json({
		message: "email verified",
		status: "success"
	})
}

const getCustomer = async (req, res) => {
	const { customerId } = req.customer
	const customer = await Customers.findOne({
		where: {customerId: customerId}
	})

	res.status(StatusCodes.OK).json({
		status: "success",
		customer: customer
	})
}

const updateCustomer = async (req, res) => {
	const { customerId } = req.customer

	await Customers.update(req.body, {
		where: {customerId: customerId}
	})

	const customer = await Customers.findOne({
		where: {customerId: customerId}
	})
	
	res.status(StatusCodes.OK).json({
		status: "success",
		message: "customer updated successfully",
		customer: customer
	})
}


module.exports = {
	createCustomer,
	sendOtp,
	verifyEmail,
	getCustomer,
	updateCustomer
}