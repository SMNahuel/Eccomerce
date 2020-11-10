const server = require('express').Router();
const orders = require('../controllers/orders');

server.get('/', (req, res, next) => {
	orders.read()
	.then(r => res.send(r))
	.catch(next);
});

module.exports = server;