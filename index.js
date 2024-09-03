require('dotenv').config()

// async errors
require('express-async-errors')
const express = require('express')
const app = express()
app.use(express.json())

// database instance
const sequelize = require('./config/db.config')

//middleware
const { notFoundMiddleware } = require('./middleware/not-found')
const { errorHandlerMiddleware } = require('./middleware/error-handler')


const customerRouter = require('./routes/customer.route')
const authRouter = require('./routes/auth.route')
const walletRouter = require('./routes/wallet.route')
const { authMiddleware } = require('./middleware/auth')

//use routes
app.use('/api/v1/customers', customerRouter)
app.use("/api/v1/auth", authRouter)
app.use('/api/v1/wallet', authMiddleware,walletRouter)

//use middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000

const start = async () => {
	try {
		await sequelize.authenticate()
	} catch (err) {
		console.log(err)
	}
	await sequelize.sync({ alter: false })
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}`)
	})
}

start()