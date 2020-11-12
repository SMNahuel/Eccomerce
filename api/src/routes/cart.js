const server = require('express').Router();
const cart = require('../controllers/cart');

server.post('/', (req, res, next) => {
    let cookieId
    req.cookies.user ? cookieId = req.cookies.user.userId : cookieId = undefined
    console.log(cookieId)
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

server.get('/:id', (req, res, next) => {
    const { id } = req.params
    cart.cartOf(id)
    .then(r => res.send(r))
    .catch(next)
})

server.post('/:id', (req, res, next) => {
    const { idOrder } = req.body
    const { id } = req.params
    cart.create(id, idOrder)
    .then(r => res.send(r))
    .catch(next)
})



module.exports = server;