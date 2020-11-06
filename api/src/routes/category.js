const server = require('express').Router();
const { Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Category.findAll()
	.then(category => res.send(category))
	.catch(next);
})

server.post('/', (req, res, next) => {
    const { name, description } = req.body
    if (!name || !description) {
        return res.status(400).send('Body must have a name and description')
    }
    Category.findOrCreate({
        where: {name: name},
        defaults: {description: description}
    })
    .then(() => Category.findAll())
	.then(category => res.send(category))
	.catch(next);
})

server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id ) {
        return res.status(400).send('An id needed to modify the categories')
    }
    if (!name || !description) {
        return res.status(400).send('The body must contain a name or a description to modify the category')
    }

	let atributesToUpdate = {};
    if (description) atributesToUpdate.description = description;
    if (name) atributesToUpdate.name = name;
    
    Category.update(
        atributesToUpdate,
        { where: { id: id } }
    )
    .then(() => Category.findAll())
	.then(category => res.send(category))
	.catch(next);
});

server.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id ) {
        return res.status(400).send('An id needed to delete the categories')
    }
    Category.destroy({ where: { id: id } })
    .then(() => Category.findAll())
	.then(category => res.send(category))
	.catch(next);
});

module.exports = server;