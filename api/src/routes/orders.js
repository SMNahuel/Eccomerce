const server = require('express').Router();
const cart = require('../controllers/cart');

/*
server.get('/', (req, res, next) => {
	cart.showCart()
	.then(r => res.send(r))
	.catch(next);
});
*/

server.get('/status', (req,res,next)=>{
	if(!req.body.status){
		return next(new Error('An status is needed to search products'));
	}
	cart.getByStatus(req.body.status)
	.then(r=> res.send(r))
	.catch(next);
})

server.get('/', (req,res,next)=>{
    const { userId } = req.cookies;
    if(!userId){
        return next(new Error('A userId is needed to bring all orders'));
    }
	cart.orders(userId)
	.then(r=> res.send(r))
	.catch(next);
})

server.get('/:id', (req, res, next) => {
    const { userId } = req.cookies;
    if(!userId){
        return next(new Error('A userId is needed to bring the order'));
    }
	if(!req.params.id){
		return next(new Error('Necesitamos un id para obtener las ordenes de un usuario'));
	}
    cart.belongsTo(req.params.id, userId)
    .then(belongsToUser => {
        if (!belongsToUser){
            throw new Error('The order must belong to the user to be showed')
        }
        return cart.getById(req.params.id)
    })
    .then(r => res.send(r))
    .catch(next)
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