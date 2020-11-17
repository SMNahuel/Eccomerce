const server = require('express').Router();
const cart = require('../controllers/cart');
const user = require('../controllers/user');

// Ruta que trae el carrito de un usuario
server.get('/', (req, res, next) => {
    const { userId } = req.cookies;
    if(!userId){
        return next(new Error('A userId is needed to bring a cart'));
    }
    cart.cartOf(userId)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que agrega un producto al carrito de un usuario
server.post('/', (req, res, next) => {
    const { userId } = req.cookies
    const { productId, quantity } = req.body
    if (!productId || !quantity) {
        return next(new Error('a productId and a quantity are needed to add the product to the cart'));
    }
    if (!userId) {
        cart.addToCartAnonimus(req.body)
        .then(r => res.cookie("userId", r.userId).send(r))
        .catch(next)
    } else {
        user.exists(userId)
        .then(exists => {
            if (!exists) {
                return cart.addToCartAnonimus(req.body)
                .then(r => res.cookie("userId", r.userId).send(r))
            } else {
                return cart.addToCart(userId, req.body)
                .then(r => res.send(r))
            }
        })
        .catch(next)
    }
})

// Ruta que actualiza el carrito de un usuario
server.put('/', (req, res, next) => {
    const { userId } = req.cookies;
    const { id, products } = req.body
    if (!userId) {
        return next(new Error('A userId is required to update a cart'));
    }
    if (!id || !products) {
        return next(new Error('A cart content is required to update a cart'));
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
server.put('/create', (req, res, next) => {
    const { userId } = req.cookies;
    const { id, products } = req.body
    if (!userId) {
        return next(new Error('A userId is required to create a cart'));
    }
    if (!id || !products) {
        return next(new Error('A cart content is required to create a cart'));
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
server.put('/cancel', (req, res, next) => {
    const { userId } = req.cookies;
    const { id, products } = req.body
    if (!userId) {
        return next(new Error('A userId is required to cancel a cart'));
    }
    if (!id || !products) {
        return next(new Error('A cart content is required to cancel a cart'));
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