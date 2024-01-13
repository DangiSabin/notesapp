const { Router } = require("express")
const express = require("express")
const routes = express.Router()
const user = require('./controllers/user')
const note = require('./controllers/notes')
routes.route('/login')
.post(user.login)

routes.route('/register')
.post(user.register)

routes.route('/notes/:id')
.get(note.userNotes)
.post(note.addNote)

routes.route('/notes/note/:dateCreated')
.get(note.getNote)
.patch(note.editNote)
.delete(note.deleteNote)

module.exports= routes


