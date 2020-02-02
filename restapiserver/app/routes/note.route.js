module.exports = (app) => {
    var notes = require('../controllers/note.controller.js')

    // create a new Note
    app.post('/notes', notes.create)

    // retrieve all Notes
    app.get('/notes', notes.findAll)

    // Retrieve a sing Note with noteId
    app.get('/notes/:noteId', notes.findOne)

    // update a Note with noteId
    app.put('/notes/:noteId', notes.update)

    // delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete)
}