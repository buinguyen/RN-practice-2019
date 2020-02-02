var mongoose = require('mongoose')

var NoteSchema = mongoose.Schema({
    title: String,
    content: Number
}, {
    timestamps: false
}, { 
    versionKey: false 
})

module.exports = mongoose.model('Note', NoteSchema)