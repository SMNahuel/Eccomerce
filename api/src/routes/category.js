const server = require('express').Router();
const category = require('../controllers/category');
const { forAdmin } = require('../middlewares/authenticate');

// Ruta que devuelve todas las categorias
server.get('/', (req, res, next) => {
    category.read()
    .then(r => res.send(r))
    .catch(next);
})

// Ruta que agrega una categoria
server.post('/', forAdmin, (req, res, next) => {
    const { name, description } = req.body
    if (!name || !description) {
        return res.status(400).send('Body must have a name and description');
    }
    category.create(req.body)
	.then(r => res.send(r))
	.catch(next);
})

// Ruta que actualiza una categoria
server.put('/:id', forAdmin, (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id ) {
        return res.status(400).send('An id needed to modify the categories')
    }
    if (!name || !description) {
        return res.status(400).send('The body must contain a name or a description to modify the category')
    }

    category.update(id, req.body)
	.then(r => res.send(r))
	.catch(next);
});

// Ruta que borra una categoria
server.delete('/:id', forAdmin, (req, res, next) => {
    const { id } = req.params;
    if (!id ) {
        return res.status(400).send('An id needed to delete the categories')
    }
    category.delete(id)
	.then(r => res.send(r))
	.catch(next);
});

module.exports = server;