const axios = require('axios')
const TO_KOBO = 100


const initializePayment = async (email, amount) => {
	return axios({
		method: 'post',
		url: 'https://api.paystack.co/transaction/initialize',
		data: {
			email: email,
			amount: amount * TO_KOBO
		},
		headers: {
			Authorization: `Bearer ${process.env.SECRET_KEY}`
		}
	})
}


const verifyPayment = async(reference) => {
	return axios({
		method: 'get',
		url: `https://api.paystack.co/transaction/verify/${reference}`,
		headers: {
			Authorization: `Bearer ${process.env.SECRET_KEY}`
		}
	})
}



module.exports = {
	initializePayment,
	verifyPayment
}