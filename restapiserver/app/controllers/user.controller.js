var Base64 = require('js-base64').Base64;

var User = require('../models/user.model.js')

exports.create = (req, res) => {
    // Create and Save a new User
    if (!req.body.username || !req.body.password || !req.body.token || !req.body.deviceids) {
        res.status(400).send({message: "User can not be empty"})
    }

    var user = new User({
        username: req.body.username,
        password: req.body.password,
        token: req.body.token,
        deviceids: req.body.deviceids
    })
    user.save((err, data) => {
        console.log(data)
        if (err) {
            console.log(err)
            res.status(500).send({message: "Some error occurred while creating a user"})
        } else {
            res.send(data)
        }
    })
}

exports.findAll = (req, res) => {
    // Retrieve and return all users
    User.find((err, users) => {
        if (err) {
            res.status(500).send({message: "Some error occurred when retrieving users"})
        } else {
            res.send(users)
        }
    })
}

exports.findByUsername = (req, res) => {
    // Find a single user with a username
    User.find((err, users) => {
        if (err) {
            res.status(500).send({message: "Some error occurred when retrieving users"})
        } else {
            let isFounded = false
            users.forEach(element => {
                if (element.username === req.params.username) {
                    isFounded = true
                    res.send(element)
                    return
                }
            });
            if (!isFounded) {
                res.status(501).send({message: "Users: No data"})
            }
        }
    })
}

exports.getAuthenticateToken = (req, res) => {
    if (!req.headers.authorization) {
        res.status(500).send({message: "Authorization failed"})
    }

    let data = req.headers.authorization.split(" ")
    let author = Base64.atob(data[1])
    let info = author.split(":")
    console.log(info[0] + " - " + info[1])

    User.find((err, users) => {
        if (err) {
            res.status(500).send({message: "Some error occurred when retrieving users"})
        } else {
            let isFounded = false
            users.forEach(element => {
                if (element.username === info[0] && element.password === info[1]) {
                    isFounded = true
                    res.send(element)
                    return
                }
            });
            if (!isFounded) {
                res.status(501).send({message: "Users: No data"})
            }
            console.log(isFounded)
        }
    })
}