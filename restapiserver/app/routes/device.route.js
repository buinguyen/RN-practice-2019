module.exports = (app) => {
    var devices = require('../controllers/device.controller.js')

    app.post('/devices', devices.create)

    app.get('/devices', devices.findAll)

    app.get('/devices/:id', devices.findById)
}