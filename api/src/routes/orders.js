const server = require('express').Router();
const cart = require('../controllers/cart');

server.get('/', (req,res,next)=>{
	//Si no tenemos id tiramos error
	if(!req.body.status){
		return next(new Error('An status is needed to search products'));
	}
	//Buscamos discriminadamente por id
	cart.getByStatus(req.body.status)
	.then(r=> res.send(r))
	.catch(next);
})

//Necesitamos ID
server.get('/:id', (req, res, next) => {
	//Retornamos todas las ordenes de un usuario
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
	//Descontruimos el body para manejar individualmente los request
	const {quantity} = req.body;
	//Manejo de errores
	if(!quantity){
		return next(new Error('An quantity is needed to search products'));
	}
	//Creamos la orden
	cart.addProduct(req.body)
	.then(r=> res.send(r))
	.catch(next);
})
module.exports = server;