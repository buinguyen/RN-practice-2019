module.exports = (app) => {
    var users = require('../controllers/user.controller.js')

    app.post('/users', users.create)

    app.get('/users', users.findAll)

    app.get('/users/:username', users.findByUsername)

    app.get('/getAuthenticateToken',  users.getAuthenticateToken)
}