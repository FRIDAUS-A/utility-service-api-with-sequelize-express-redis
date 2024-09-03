const jwt = require("jsonwebtoken")
const { loginValidation } = require("../validation/customer.validation")
const { BadRequest, Unauthenticated } = require("../errors")
const { StatusCodes } = require("http-status-codes")
const { Customers } = require("../models/customer.model")
const bcrypt = require("bcryptjs")

const loginCustomer = async (req, res) => {
	const { email, password } = req.body
	
	const { error  } = loginValidation(req.body)

	if (error) {
		throw new BadRequest(error.message)
	}
	const customer = await Customers.findOne({
		where: {email: email}
	})
	// check if email is verfied
	if (!customer.isEmailVerified) {
		throw new BadRequest("This customer does not exists, you need to verify your email first or create an acccount if you have not done so")
	}
	if (!await bcrypt.compare(password, customer.password)) {
		throw new Unauthenticated("Password is not correct")
	}

	const token = jwt.sign({customerId: customer.customerId}, process.env.JWT_KEY, {expiresIn: '30d'}
	)

	// set headers
	res.set({Authentication: token})

	res.status(StatusCodes.ACCEPTED).json({
		status: "success",
		message: "Login Successful"
	})

}



const logoutCustomer = async (req, res) => {

}



module.exports = {
	loginCustomer,
	logoutCustomer
}