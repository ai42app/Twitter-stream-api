require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./router')
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')
const sockets = require('./sockets')
const streamConnect = require('./streamConnect')

// connect sockets
sockets.connect(server)
// allow view files from uplouds folder
app.use(express.static('public'));
// disable cors
app.use(cors())
// body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const port = process.env.PORT || 9777

app.use('/', router)

sockets.on()

server.listen(port, () => {
  console.log('Listening on port ' + port + " Version 17/01/23")
})

// run twitter stream
streamConnect(0)
