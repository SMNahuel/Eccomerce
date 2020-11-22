const server = require('express').Router();
const question = require('../controllers/question')
const { forGuest } = require('../middlewares/authenticate')

server.get('/:id', (req, res, next) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).send('I need a product Id')
    }
    question.read(id)
        .then((r) => res.send(r))
        .catch(next)
})

server.post('/:productId', (req, res, next) => {
    const { productId } = req.params;
    const { message, userId } = req.body
    if (!productId) {
        return res.status(400).send('I need a product Id')
    }
    if(!message){
        return res.status(400).send('I need a message to post your question')
    }
    if(!userId){
        return res.status(400).send('I need a userID')
    }
    question.create(message, userId, productId)
        .then((r) => res.send(r))
        .catch(next)
})

server.delete('/:id', (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).send('I need an Id to delete your question')
    }
    question.delete(id)
        .then(r => res.send(r))
        .catch(next)
})

module.exports = server;