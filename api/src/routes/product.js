const server = require('express').Router();
const product = require('../controllers/product');
const uploadImages = require('../middlewares/uploadImg')
const { forAdmin } = require('../middlewares/authenticate');

// Ruta que trae todos los productos
server.get('/', (req, res, next) => {
	product.read()
	.then(r => res.send(r))
	.catch(next);
});

// Ruta que permite buscar entre los productos
server.get('/search', (req, res, next) => {
	const { key } = req.query;
	if (!key) {
		return next(new Error('An key is needed to search products'));
	}

	product.search(key)
	.then(r => res.send(r))
	.catch(next);
})

// Ruta para que trae el detalle de un producto
// no se esta usando
/* server.get('/:id', (req, res, next) => {
	const {id} = req.params;
	if (!id) {
		return next(new Error('A id is needed to show a detail of a product'));
	}
	
	product.detail(id)
	.then(r => res.send(r))
	.catch(next);
}); */

// Ruta que trae los productos de una categoria
server.get('/category/:id', (req, res, next) => {
	const { id } = req.params;
	if (!id) {
		return next(new Error('A id of a category is needed to filter by categories'));
	}
	
	product.categoryFilter(id)
	.then(r => res.send(r))
	.catch(next);
})

// Ruta que permite agregar un producto
server.post('/', forAdmin, (req, res, next) => {
	const { name } = req.body;
	if (!name) {
		return next(new Error('Body must have a product name'));
	}

	product.create(req.body)
	.then(r => res.send(r))
	.catch(next);
});

// Ruta que permite cargar multiples imagenes
server.post('/images/:id', forAdmin, uploadImages, (req, res, next) => {
    const {id} = req.params
	if (!id) {
		return next(new Error('A id is needed to set the images of a product'));
	}
	if (!req.files) {
		return next(new Error(`the images (key:'image') are required to set them on the product`));
	}

    product.setImages(id, req.files)
	.then(r => res.send(r))
	.catch(next);
});

// Ruta que permite actualizar un producto
server.put('/:id', forAdmin, (req, res, next) => {
	const { id } = req.params
	const { name, description, price, stock, categories } = req.body;
	if (!name && !description && !price && !stock && !categories) {
		return next(new Error('At least one attribute (name, description, price, stock or categories) of product is needed to modify it'));
	}

	product.update(id, req.body)
	.then(r => res.send(r))
	.catch(next);
});

// Ruta que permite eliminar un prodcuto
server.delete('/:id', forAdmin, (req, res, next) => {
    const { id } = req.params;
    if (!id ) {
        return res.status(400).send('An id is needed to delete the product')
    }
    product.delete(id)
	.then(r => res.send(r))
	.catch(next);
});

module.exports = server;
