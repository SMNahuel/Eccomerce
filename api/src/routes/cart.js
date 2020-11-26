const server = require('express').Router();
const cart = require('../controllers/cart');
const { forAnonym, forGuest } = require('../middlewares/authenticate')

// Opciones de  la cookie del carrito
const cookieOptions = {
    expires: new Date(Date.now() + 16 * 3600000),
    httpOnly: true,
    secure: process.env.PORT !== '3001',
    sameSite: process.env.PORT === '3001' ? 'strict' : 'none'
};

// Ruta que trae el carrito de un usuario
server.get('/', forGuest, (req, res, next) => {
    cart.cartOf(req.user.id)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que agrega un producto al carrito de un usuario
server.post('/', (req, res, next) => {
    const { productId, quantity } = req.body
    if (!productId || !quantity) {
        return res.status(400).send('a productId and a quantity are needed to add the product to the cart');
    }

    if (!req.isAuthenticated()) {
        cart.addToCartAnonimus(req.body, req.cookies.cartId)
        .then(cart => res.cookie('cartId', cart.id, cookieOptions).send(cart))
        .catch(next)
    } else {
        return cart.addToCart(req.user.id, req.body)
        .then(r => res.send(r))
        .catch(next)
    }
})

// Ruta que actualiza el carrito de un usuario
server.put('/', forAnonym, (req, res, next) => {
    const { id, products } = req.body
    if (!id || !products) {
        return res.status(400).send('A cart content is required to update a cart');
    }
    cart.update(req.user.id, req.body)
    .then(r => res.send(r))
    .catch(next)
})

// ruta que crea(confirma para procesado) el carrito de un usuario
server.put('/create', forGuest, (req, res, next) => {
    const { id, products } = req.body.items
    const { email } = req.body
    if (!id || !products) {
        return res.status(400).send('A cart content is required to create a cart');
    }
    cart.create(req.user.id, req.body.items, email)
    .then(r => res.send(r))
    .catch(next)
})

// ruta que cancela el carrito de un usuario
server.put('/cancel', forAnonym, (req, res, next) => {
    const { id, products } = req.body
    if (!id || !products) {
        return res.status(400).send('A cart content is required to cancel a cart');
    }
    cart.cancel(req.user.id, req.body)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server;