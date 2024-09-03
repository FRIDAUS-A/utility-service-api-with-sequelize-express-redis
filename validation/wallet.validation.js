const joi = require('joi')


const amountValidation = (data) => {
	const amountSchema = joi.object({
		amount: joi.number().required()
	})
	return amountSchema.validate(data)
}


module.exports = {
	amountValidation
}