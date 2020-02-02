var Device = require('../models/device.model.js')

exports.create = (req, res) => {
    // Create and Save a new Device
    if (!req.body.id || !req.body.name || !req.body.status || !req.body.mode || !req.body.batterystatus) {
        res.status(400).send({message: "Device info can not be empty"})
    }

    var device = new Device({
        id: req.body.id,
        name: req.body.name,
        status: req.body.status,
        mode: req.body.mode,
        batterystatus: req.body.batterystatus
    })
    device.save((err, data) => {
        console.log(data)
        if (err) {
            console.log(err)
            res.status(500).send({message: "Some error occurred while creating a device"})
        } else {
            res.send(data)
        }
    })
}

exports.findAll = (req, res) => {
    // Retrieve and return all devices
    Device.find((err, devices) => {
        if (err) {
            res.status(500).send({message: "Some error occurred when retrieving devices"})
        } else {
            res.send(devices)
        }
    })
}

exports.findById = (req, res) => {
    // Find a single device with a id
    Device.find((err, devices) => {
        if (err) {
            res.status(500).send({message: "Some error occurred when retrieving a device"})
        } else {
            let isFounded = false
            devices.forEach(element => {
                if (element.id === req.params.id) {
                    isFounded = true
                    res.send(element)
                    return
                }
            })
            if (!isFounded) {
                res.status(501).send({message: "Device: No data"})
            }
        }
    })
}