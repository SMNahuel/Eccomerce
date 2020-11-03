const server = require('express').Router();
const { Category } = require('../db.js');

server.post('/', (req, res, next) => {
    const {name, description} = req.body
    if(!name || !description){
        res.status(400).send('Body must have a name and description')
    }
	Category.create({name:name, description:description})
	.then(category => res.sendStatus(category));
})

module.exports = server;