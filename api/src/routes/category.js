const server = require('express').Router();
const { Category } = require('../db.js');

server.post('/', (req, res, next) => {
    const {name, description} = req.body
    if(!name || !description){
        return res.status(400).send('Body must have a name and description')
    }
	Category.findOrCreate({
        where: {
            name: name
        },
        defaults: {
            description: description
        } 
    }).then(category => res.send(category));
})

module.exports = server;