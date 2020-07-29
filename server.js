const cors = require('cors')
const dotenv = require('dotenv')
const helmet = require('helmet')
const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const Unsplash = require('unsplash-js').default

//load env variables
dotenv.config()

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

const unsplash = new Unsplash({
  accessKey: "{APP_ACCESS_KEY}",
})

app.listen(PORT, () => console.log(`server initilized @ ${PORT}`))