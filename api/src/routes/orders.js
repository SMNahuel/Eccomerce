const server = require('express').Router();
const cart = require('../controllers/cart');
const { forAdmin, forGuest } = require('../middlewares/authenticate');

// Ruta qque devuelve las ordenes de un usuario
server.get('/', forGuest, (req,res,next)=>{
	cart.orders(req.user.id)
	.then(r=> res.send(r))
	.catch(next);
})

// Ruta que devuelve las ordenes de todos los usuarios
server.get('/admin', forAdmin, (req,res,next)=>{
	cart.getAll()
	.then(r=> res.send(r))
	.catch(next);
})

// Ruta que permite procesar una orden
server.put('/process', forAdmin, (req, res, next) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).send('A cart content is required to process a cart');
    }
    return cart.process(req.body)
    .then(r => res.send(r))
    .catch(next)
})

server.get('/process', forAdmin, (req, res, next) => {
    
})

module.exports = server;