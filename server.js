const dotenv = require('dotenv')
//load env variables
dotenv.config()
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const searchRouter = require('./search_photo')

//node-fetch is made global
global.fetch = fetch

const PORT = process.env.PORT || 3500

const app = express()

//middleware
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/search', searchRouter)

app.listen(PORT, () => console.log(`server initilized @ ${PORT}`))