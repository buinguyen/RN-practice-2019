var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

var DeviceSchema = mongoose.Schema({
    id: String,
    name: String,
    status: Number,
    mode: Number,
    batterystatus: Number
}, {
    timestamps: false
}, { 
    versionKey: false
})

module.exports = mongoose.model('Device', DeviceSchema)