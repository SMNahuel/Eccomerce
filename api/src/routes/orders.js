const server = require('express').Router();
const orders = require('../controllers/orders');

server.get('/', (req, res, next) => {
	//Retornamos todas las ordenes si discriminar
	orders.read()
	.then(r => res.send(r))
	.catch(next);
});

server.get('/:id', (req,res,next)=>{
	//Si no tenemos id tiramos error
	if(!req.params.id){
		return next(new Error('An idUser is needed to search products'));
	}
	//Buscamos discriminadamente por id
	orders.search(req.params.id)
	.then(r=> res.send(r))
	.catch(next);
})

server.post('/', (req,res,next)=>{
	//Descontruimos el body para manejar individualmente los request
	const {quantity, price} = req.body;
	//Manejo de errores
	if(!quantity){
		return next(new Error('An quantity is needed to search products'));
	}
	if(!price){
		return next(new Error('An price is needed to search products'));
	}
	//Creamos la orden
	orders.create(req.body)
	.then(r=> res.send(r))
	.catch(next);
})
module.exports = server;