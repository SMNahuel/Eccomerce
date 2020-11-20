const server = require('express').Router();
const reviews = require('../controllers/reviews');

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
// TODO pasar a autentificacion!!!!!!!!!!!!!!!!
server.get('/user/:userId', (req, res, next) => {
    const {userId} = req.params;
    if (!userId) {
        return res.status(400).send('error de user id')
    }

    reviews.byUser(userId)
	.then(r => res.send(r))
	.catch(next);
})

// Ruta para agregar review
// TODO pasar a autentificacion!!!!!!!!!!!!!!!!
server.post('/:productId/:userId', (req,res,next) =>{
    const {productId, userId} = req.params;
    if (!productId) {
        return res.status(400).send('error de product id')
    }
    if (!userId) {
        return res.status(400).send('error de user id')
    }
    const {message, qualification} = req.body;
	if(!qualification) {
		return res.status(400).send('Need a qualification');
	}
	if(!message) {
		return res.status(400).send('Need a message');
	}
	reviews.create(userId, productId, req.body)
	.then(r => res.send(r))
	.catch(next);
})

// Ruta para agregar review
// TODO pasar a autentificacion!!!!!!!!!!!!!!!!
server.put('/:productId/:userId', (req,res,next) =>{
    const {productId, userId} = req.params;
    if (!productId) {
        return res.status(400).send('error de product id')
    }
    if (!userId) {
        return res.status(400).send('error de user id')
    }
    const {message, qualification} = req.body;
	if(!qualification) {
		return res.status(400).send('Need a qualification');
	}
	if(!message) {
		return res.status(400).send('Need a message');
	}
	reviews.update(userId, productId, req.body)
	.then(r => res.send(r))
	.catch(next);
})

// Ruta para agregar review
// TODO pasar a autentificacion!!!!!!!!!!!!!!!!
server.put('/:productId/:userId', (req,res,next) =>{
    const {productId, userId} = req.params;
    if (!productId) {
        return res.status(400).send('error de product id')
    }
    if (!userId) {
        return res.status(400).send('error de user id')
    }
    const {message, qualification} = req.body;
	if(!qualification) {
		return res.status(400).send('Need a qualification');
	}
	if(!message) {
		return res.status(400).send('Need a message');
	}
	reviews.update(userId, productId, req.body)
	.then(r => res.send(r))
	.catch(next);
})

// Ruta eliminar review
// TODO pasar a autentificacion!!!!!!!!!!!!!!!!
server.delete('/:productId/:userId', (req,res,next)=>{
    const {userId, productId} = req.params;
    if (!productId) {
        return res.status(400).send('error de product id')
    }
    if (!userId) {
        return res.status(400).send('error de user id')
    }
	reviews.delete(userId, productId)
	.then(r => res.send(r))
	.catch(next);
})

module.exports = server