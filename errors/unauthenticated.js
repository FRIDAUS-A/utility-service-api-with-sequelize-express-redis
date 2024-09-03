const { StatusCodes } = require('http-status-codes')
const { CustomError } = require('./custom-error')


class Unauthenticated extends CustomError {
	constructor(message) {
		super(message)
		this.message = message
		this.statusCode = StatusCodes.UNAUTHORIZED
	}
} 

module.exports = {
	Unauthenticated
}