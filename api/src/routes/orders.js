const server = require('express').Router();
const cart = require('../controllers/cart');
const { forAdmin } = require('../middlewares/authenticate');

// Ruta qque devuelve las ordenes de un usuario
server.get('/', (req,res,next)=>{
	const { userId } = req.cookies;
	if(!userId){
		return next(new Error('A userId is needed to bring all orders'));
	}
	cart.orders(userId)
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
        return next(new Error('A cart content is required to process a cart'));
    }
    return cart.process(req.body)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server;