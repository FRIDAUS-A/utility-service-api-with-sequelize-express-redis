const express = require('express')
const { authMiddleware } = require('../middleware/auth')
const { startWalletFunding, completeWalletFunding } = require('../controllers/wallet.controller')

const walletRouter = express.Router()

walletRouter.route('/').post(authMiddleware, startWalletFunding)

walletRouter.route('/:reference').get(completeWalletFunding)


module.exports = walletRouter