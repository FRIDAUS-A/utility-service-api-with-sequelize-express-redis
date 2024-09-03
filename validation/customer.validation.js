const joi = require('joi')

const createCustomerValidation = (data) => {
	const customerSchema = joi.object({
		surname: joi.string().required(),
		othernames: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().required()
	})
	return customerSchema.validate(data)
}

const loginValidation = (data) => {
	const loginSchema = joi.object({
		email: joi.string().email().required(),
		password: joi.string().required()
	})
	return loginSchema.validate(data)
}

const otpValidation = (data) => {
	const otpSchema = joi.object({
		email: joi.string().email().required(),
		otpValue: joi.string().required()
	})
	return otpSchema.validate(data)
}

const emailValidation = (data) => {
	const emailSchema = joi.object({
		email: joi.string().email().required()
	})
	return emailSchema.validate(data)
}

module.exports = { createCustomerValidation,
loginValidation,
otpValidation,
emailValidation
}