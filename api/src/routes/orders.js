const server = require('express').Router();
const cart = require('../controllers/cart');

server.get('/', (req,res,next)=>{
	if(!req.body.status){
		return next(new Error('An status is needed to search products'));
	}
	cart.getByStatus(req.body.status)
	.then(r=> res.send(r))
	.catch(next);
})

server.get('/:id', (req, res, next) => {
	if(!req.params.id){
		return next(new Error('Necesitamos un id para obtener las ordenes de un usuario'));
	}
	cart.allCarts(req.params.id)
	.then(r => res.send(r))
	.catch(next);
});

server.get('/', (req, res, next) => {
	cart.showCart()
	.then(r => res.send(r))
	.catch(next);
});


server.post('/', (req,res,next)=>{
	const {quantity} = req.body;
	if(!quantity){
		return next(new Error('An quantity is needed to search products'));
	}
	cart.addProduct(req.body)
	.then(r=> res.send(r))
	.catch(next);
})
module.exports = server;