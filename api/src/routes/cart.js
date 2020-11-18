const server = require('express').Router();
const cart = require('../controllers/cart');
const user = require('../controllers/user');
const {cookieOptions, forGuest} = require('../middlewares/authenticate')

// Ruta que trae el carrito de un usuario
server.get('/', forGuest, (req, res, next) => {
    const { userId } = req.cookies;
    cart.cartOf(userId)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que agrega un producto al carrito de un usuario
server.post('/', (req, res, next) => {
    const { userId } = req.cookies
    const { productId, quantity } = req.body
    if (!productId || !quantity) {
        return res.status(400).send('a productId and a quantity are needed to add the product to the cart');
    }
    if (!userId) {
        cart.addToCartAnonimus(req.body)
        .then(r => res.cookie("userId", r.userId, cookieOptions).send(r))
        .catch(next)
    } else {
        user.exists(userId)
        .then(exists => {
            if (!exists) {
                return cart.addToCartAnonimus(req.body)
                .then(r => res.cookie("userId", r.userId, cookieOptions).send(r))
            } else {
                return cart.addToCart(userId, req.body)
                .then(r => res.send(r))
            }
        })
        .catch(next)
    }
})

// Ruta que actualiza el carrito de un usuario
server.put('/', forGuest, (req, res, next) => {
    const { userId } = req.cookies;
    const { id, products } = req.body
    if (!id || !products) {
        return res.status(400).send('A cart content is required to update a cart');
    }
    cart.belongsTo(id, userId)
    .then(belongsToUser => {
        if (!belongsToUser){
            throw new Error('The cart must belong to the user to be updated')
        }
        return cart.update(userId, req.body)
    })
    .then(r => res.send(r))
    .catch(next)
})

// ruta que crea(confirma para procesado) el carrito de un usuario
server.put('/create', forGuest, (req, res, next) => {
    const { userId } = req.cookies;
    const { id, products } = req.body
    if (!id || !products) {
        return res.status(400).send('A cart content is required to create a cart');
    }
    cart.belongsTo(id, userId)
    .then(belongsToUser => {
        if (!belongsToUser){
            throw new Error('The cart must belong to the user to be created')
        }
        return cart.create(userId, req.body)
    })
    .then(r => res.send(r))
    .catch(next)
})

// ruta que cancela el carrito de un usuario
server.put('/cancel', forGuest, (req, res, next) => {
    const { userId } = req.cookies;
    const { id, products } = req.body
    if (!id || !products) {
        return res.status(400).send('A cart content is required to cancel a cart');
    }
    cart.belongsTo(id, userId)
    .then(belongsToUser => {
        if (!belongsToUser){
            throw new Error('The cart must belong to the user to be canceled')
        }
        return cart.cancel(userId, req.body)
    })
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server;