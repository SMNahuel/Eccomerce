const server = require('express').Router();
const cart = require('../controllers/cart');

server.get('/users/:idUser/cart', (req, res, next) => {
    const { idUser } = req.params
    cart.read(idUser)
    .then(r => res.send(r))
    .catch(next)
})