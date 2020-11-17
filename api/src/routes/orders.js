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

// no se esta usando
/* server.get('/status', (req,res,next)=>{
	if(!req.body.status){
		return next(new Error('An status is needed to search products'));
	}
	cart.getByStatus(req.body.status)
	.then(r=> res.send(r))
	.catch(next);
}) */

// no se esta usando
/* server.get('/:id', (req, res, next) => {
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
}); */

// no se esta usando
/* server.post('/', (req,res,next)=>{
	const {quantity} = req.body;
	if(!quantity){
		return next(new Error('An quantity is needed to search products'));
	}
	cart.addProduct(req.body)
	.then(r=> res.send(r))
	.catch(next);
}) */
module.exports = server;