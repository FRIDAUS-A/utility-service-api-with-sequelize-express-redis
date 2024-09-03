const { Unauthenticated } = require("../errors")
const jwt = require("jsonwebtoken")


const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization
	console.log(req.headers)
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new Unauthenticated("No token provided or Check if your token starts with 'Bearer '")
	}
	const token = authHeader.split(' ')[1]
	try {
		const decoded =  jwt.verify(token, process.env.JWT_KEY)
		const { customerId } = decoded
		req.customer = { customerId: customerId }
	} catch(error) {
		throw new Unauthenticated("Token is Invalid")
	}
	next()
}

module.exports = { authMiddleware }