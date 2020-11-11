const server = require('express').Router();
const cart = require('../controllers/cart');

server.get('/:id/cart', (req, res, next) => {
    const { id } = req.params
    cart.read(id)
    .then(r => res.send(r))
    .catch(next)
})

server.post('/:id/cart', (req, res, next) => {
    const { idOrder } = req.body
    const { id } = req.params
    cart.create(id, idOrder)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server;