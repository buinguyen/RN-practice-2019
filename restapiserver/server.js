const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const publicIp = require('public-ip')
const port = 3000

// create express app
const app = express()
app.Promise = require('bluebird')

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js')
var mongoose = require('mongoose')

mongoose.connect(dbConfig.url, {useMongoClient: true})
mongoose.connection.on('error', () => {
    console.log('Could not connect to the database. Exiting now...')
    process.exit()
})

mongoose.connection.once('open', () => {
    console.log('Successfully connected to the database')
})

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to test server"})
})

// require routes
require('./app/routes/note.route.js')(app)
require('./app/routes/device.route.js')(app)
require('./app/routes/user.route.js')(app)

const server = http.createServer(app)

server.listen(port, '0.0.0.0', ()=> {
    console.log('Server is listening on port ' + port)
})

