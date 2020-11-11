const server = require('express').Router();
const cart = require('../controllers/cart');

server.get('/', (req, res, next) => {
    const { idUser } = req.params
    cart.read(idUser)
    .then(r => res.send(r))
    .catch(next)
})

server.post('/:idOrder', (req, res, next) => {
    const { idUser, idOrder } = req.params
    cart.create(idUser, idOrder)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server;