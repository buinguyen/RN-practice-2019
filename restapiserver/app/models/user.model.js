var mongoose = require('mongoose')

var UserSchema = mongoose.Schema( {
    username: String,
    password: String,
    token: String,
    deviceids: [
        {
            type: String
        }
    ]
}, {
    timestamps: false
}, { 
    versionKey: false
})

module.exports = mongoose.model('User', UserSchema)