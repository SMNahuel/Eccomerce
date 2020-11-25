const server = require('express').Router();
const respond = require('../controllers/respond');
const { forGuest } = require('../middlewares/authenticate');

// Ruta que permite crear una respuesta
server.post('/:commentId', forGuest, (req, res, next) => {
    const { commentId } = req.params;
    const { message } = req.body
    if (!commentId) {
        return res.status(400).send('I need a comment Id')
    }
    if(!message){
        return res.status(400).send('I need a message to post your respond')
    }
    respond.create(message, req.user.id, commentId)
    .then((r) => res.send(r))
    .catch(next)
})

// ruta que permite modificar una respuesta
server.put('/', forGuest, (req, res, next) => {
    const { id, message } = req.body
    if (!id) {
        return res.status(400).send('I need an Id to update your respond')
    }
    if(!message){
        return res.status(400).send('I need a message to update your respond')
    }
    respond.update(id, message, req.user.id)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que permite eliminar un comentario
server.delete('/:id', forGuest, (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).send('I need an Id to delete your respond')
    }
    if (req.user.rolId < 4) {
        respond.deletee(id, req.user.id)
        .then(r => res.send(r))
        .catch(next)
    } else {
        respond.adminDelete(id)
        .then(r => res.send(r))
        .catch(next)
    }
})

module.exports = server;