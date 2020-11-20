const server = require('express').Router();
const reviews = require('../controllers/reviews');
const { forGuest } = require('../middlewares/authenticate')

// Ruta que trae todas las reviews de un producto
server.get('/:productId', (req, res, next) => {
    const {productId} = req.params;
    if (!productId) {
        return res.status(400).send('error de product id')
    }

    reviews.byProduct(productId)
	.then(r => res.send(r))
	.catch(next);
})

// ruta que trae todas las revies de un usuario
server.get('/user/:userId', forGuest, (req, res, next) => {
    reviews.byUser(req.user.id)
	.then(r => res.send(r))
	.catch(next);
})

// Ruta para agregar review
server.post('/:productId', forGuest, (req,res,next) =>{
    const {productId} = req.params;
    if (!productId) {
        return res.status(400).send('error de product id')
    }
    const {message, qualification} = req.body;
	if(!qualification) {
		return res.status(400).send('Need a qualification');
	}
	if(!message) {
		return res.status(400).send('Need a message');
	}
	reviews.create(req.user.id, productId, req.body)
	.then(r => res.send(r))
	.catch(next);
})

// Ruta eliminar review
server.delete('/:productId', forGuest, (req,res,next)=>{
    const {productId} = req.params;
    if (!productId) {
        return res.status(400).send('error de product id')
    }
	reviews.delete(req.user.id, productId)
	.then(r => res.send(r))
	.catch(next);
})

module.exports = server