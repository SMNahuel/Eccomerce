const server = require('express').Router();
const comment = require('../controllers/comment');
const { forGuest } = require('../middlewares/authenticate');

// Ruta que permite traer todos los comentarios de un producto
server.get('/:productId', (req, res, next) => {
    const { productId } = req.params
    if (!productId) {
        return res.status(400).send('I need a product Id')
    }
    comment.read(productId)
    .then((r) => res.send(r))
    .catch(next)
})

// Ruta que permite crear un comentario
server.post('/:productId', forGuest, (req, res, next) => {
    const { productId } = req.params;
    const { message } = req.body
    if (!productId) {
        return res.status(400).send('I need a product Id')
    }
    if(!message){
        return res.status(400).send('I need a message to post your comment')
    }
    comment.create(message, req.user.id, productId)
    .then((r) => res.send(r))
    .catch(next)
})

// ruta que permite modificar un comentario
server.put('/', forGuest, (req, res, next) => {
    const { id, message } = req.body
    if (!id) {
        return res.status(400).send('I need an Id to update your comment')
    }
    if(!message){
        return res.status(400).send('I need a message to update your comment')
    }
    comment.update(id, message, req.user.id)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que permite eliminar un comentario
server.delete('/:id', forGuest, (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).send('I need an Id to delete your comment')
    }
    if (req.user.rolId < 4) {
        comment.deletee(id, req.user.id)
        .then(r => res.send(r))
        .catch(next)
    } else {
        comment.adminDelete(id)
        .then(r => res.send(r))
        .catch(next)
    }
})

module.exports = server;