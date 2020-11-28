const server = require('express').Router();
const cart = require('../controllers/cart');
const user = require('../controllers/user');
const {checkout, confirmPay} = require('../utils/sendEmail')
const { forAdmin, forGuest } = require('../middlewares/authenticate');

<<<<<<< HEAD
// Ruta que devuelve las ordenes de un usuario
=======

// Ruta qque devuelve las ordenes de un usuario
>>>>>>> f050a921494dbcc1f96509876b27ec8390799021
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
//Modificar una order
server.put('/change', forAdmin, (req, res, next) => {
    const {state} = req.body;
    const {id} = req.body.order;
    if (!id) {
        return res.status(400).send('A cart content is required to process a cart');
    }

    return cart.changeState(id, state)
    .then(r => res.send(r))
    .catch(next)
})
// Ruta que permite procesar una orden
/* server.put('/process', forAdmin, (req, res, next) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).send('A cart content is required to process a cart');
    }
    return cart.process(req.body)
    .then(r => res.send(r))
    .catch(next)
}) */

server.post('/process', forAdmin, (req, res, next) => {
<<<<<<< HEAD
    const {user} = req.body
    checkout(user.email, user.name)
    .then(r => res.send('Email sended'))
    .catch(next)
     
=======
    const { order } = req.body
    const data = req.body;
    // console.log(order.user.email, data)
    checkout(order.user.email, data)    
    .then(r => res.send('Email sended'))
    .catch(next)
})

server.post('/confirmPay', (req, res, next) =>{
    const data = req.body;
    console.log(data)
    confirmPay(data.email, data)
    .then(r => res.send('Email sended'))
    .catch(next)
>>>>>>> f050a921494dbcc1f96509876b27ec8390799021
})

module.exports = server;