const server = require('express').Router();
const cart = require('../controllers/cart');

server.post('/', (req, res, next) => {
    cart.createAnonimus(req.body)
    .then(r => res.send(r))
    .catch(next)
})

server.get('/:id', (req, res, next) => {
    const { id } = req.params
    cart.read(id)
    .then(r => res.send(r))
    .catch(next)
})

server.post('/:id', (req, res, next) => {
    const { id } = req.params
    console.log('Holaa ')
    cart.create(id)
    .then(r => res.send(r))
    .catch(next)
})



module.exports = server;