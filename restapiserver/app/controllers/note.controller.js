var Note = require('../models/note.model.js')

exports.create = (req, res) => {
    // Create and Save a new Note
    if (!req.body.content) {
        res.status(400).send({message: "Note can not be empty"})
    }

    var note = new Note({title: req.body.title || "Untitled Note", content: req.body.content})
    note.save((err, data) => {
        console.log(data)
        if (err) {
            console.log(err)
            res.status(500).send({message: "Some error occurred while creating a note"})
        } else {
            res.send(data)
        }
    })
}

exports.findAll = (req, res) => {
    // Retrieve and return all notes
    Note.find((err, notes) => {
        if (err) {
            res.status(500).send({message: "Some error occurred when retrieving notes"})
        } else {
            res.send(notes)
        }
    })
}

exports.findOne = (req, res) => {
    // Find a single note with a noteId
    Note.findById(req.params.noteId, (err, data) => {
        if (err) {
            res.status(500).send({message: "Could not retrieve note with id: " + req.params.noteId})
        } else {
            res.send(data)
        }
    })
}

exports.update = (req, res) => {
    // Update a note with noteId
    Note.findById(req.params.noteId, (err, note) => {
        if (err) {
            res.status(500).send({message: "Could note find a note with id: " + req.params.noteId})
        }
        note.title = req.params.title
        note.content = req.params.content
        note.save((err, data) => {
            if (err) {
                res.status(500).send({message: "Could not update note with id: " + req.params.noteId})
            }
        })
    })
}

exports.delete = (req, res) => {
    // Delete a note with noteId
    Note.remove({_id: req.params.noteId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete note with id " + req.params.noteId});
        } else {
            res.send({message: "Note deleted successfully!"})
        }
    });
}