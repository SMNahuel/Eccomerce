const server = require('express').Router();
const cart = require('../controllers/cart');

server.post('/', (req, res, next) => {
    let cookieId
    req.cookies.user ? cookieId = req.cookies.user.userId : cookieId = undefined
    cart.createAnonimus(req.body, cookieId)
    .then(r => cookieId ? res.send(r) : res.cookie("user", r[0]).send(r))
    .catch(next)
})

server.get('/', (req, res, next) => {
    const userId = req.cookies.user.userId
    cart.allCarts(userId)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/:cartId', (req, res, next) => {
    const { cartId } = req.params
    cart.changeCart(cartId, req.body)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:cartId', (req, res, next) => {
    const { cartId } = req.params
    cart.delete(cartId)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server;