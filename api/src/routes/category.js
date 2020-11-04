const server = require('express').Router();
const { Category } = require('../db.js');

server.post('/', (req, res, next) => {
    const { name, description } = req.body
    if (!name || !description) {
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


server.put('/', (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).send('Error')
    }
    Category.update(
        { description: description },
        { where: { name: name } }
    ).then(category => res.send(category));
});



server.delete('/', (req, res, next) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).send('Body must have a name')
    }
    Category.destroy({ where: { name: name } })
        .then(category => {
            res.status(200).json(category)
        })
        .catch(err => console.log(err))
});

module.exports = server;