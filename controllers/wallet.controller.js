const { StatusCodes } = require("http-status-codes")
const { initializePayment, verifyPayment } = require("../services/payment.service")
const { Customers } = require("../models/customer.model")
const { BadRequest } = require("../errors")
const { Transactions } = require("../models/transaction.model")
const { v4: uuidv4 } = require("uuid")
const walletRouter = require("../routes/wallet.route")
const { Wallets } = require("../models/wallet.model")
const { amountValidation } = require("../validation/wallet.validation")
const NAIRA_CONVERSION = 100



const startWalletFunding = async (req, res) => {
	const { customerId } = req.customer
	const { amount } = req.body
	const { error } = amountValidation(req.body)

	if (error) throw new BadRequest(error.message)
	const customer = await Customers.findOne({
		where: {customerId: customerId}
	})
	const response = await initializePayment(customer.email, amount)
	console.log(response.data)

	res.status(StatusCodes.OK).json({
		status: "success",
		message: "Payment initialized successfully",
		data: {
			payment_url: response.data.data.authorization_url,
			access_code: response.data.data.reference
		}
	})
}


const completeWalletFunding = async (req, res) => {
	const { customerId } = req.customer
	const { reference } = req.params

	const transaction = await Transactions.findOne({
		where: {paymentReference: reference }
	})

	if (transaction) {
		throw new BadRequest("Invalid Transaction")
	}

	const response = await verifyPayment(reference)

	if (response.data.data.status != 'success') {
		throw new BadRequest("Invalid Transaction or Payment failed")
	}
	const customer = await Customers.findOne({
		where: {customerId: customerId}
	})

	const wallet = await Wallets.findOne({
		where: { customerId: customerId }
	})

	await Transactions.create({
		transactionId: uuidv4(),
		customerId: customerId,
		walletId: walletRouter.walletId,
		paymentReference: reference,
		email: customer.email,
		description: 'funding wallet',
		transactionType: 'credit',
		service: 'wallet',
		paymentMeans: 'others',
		amount: response.data.data.amont / NAIRA_CONVERSION,
		status: 'completed'
	})

	const updatedAmount = Number(wallet.amount) + (response.data.data.amount / NAIRA_CONVERSION)

	await Wallets.update({amount: updatedAmount}, {
		where: {customerId: customerId}
	})

	res.status(StatusCodes.OK).json({
		status: "success",
		message: "Wallet successfully funded"
	})
}


module.exports = {
	startWalletFunding,
	completeWalletFunding
}