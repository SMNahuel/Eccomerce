const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll({ include: Category })
	.then(products => res.send(products))
	.catch(next);
});

server.get('/:id', (req, res, next) => {
	const {id} = req.params;
	Product.findOne({
		where:{id: id},
		include: Category
	})
	.then(product => {
		if(!product) throw `product id: ${id} does not exist`
		res.send(product)
	})
	.catch(next);
});

server.get('/category/:id', (req, res, next) => {
	const { id } = req.params;
	Category.findOne({
		where: { id: id },
		include: Product
	})
	.then (products => res.send(products))
	.catch(next);
})

server.delete('/:id', (req, res, next) => {
	const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        throw 'Body must have a name';
    }
    Product.destroy({ 
		where: {id: id} 
	}).then(products => {
        res.status(200).json(products)
    }).catch(next);
});

server.post('/', (req, res, next) => {
	var {name, description, price, stock, categories} = req.body;
	if (!name) return res.status(400).send('Body must have a product name');
	if (!categories) categories = [];
	Product.findOne({ where: { name: name }})
	.then(product => {
		if (product) throw 'the product [' + name + '] already exists';
		return Category.findAll();
	})
	.then(DBCategories => {
		const DBCategoriesIds = DBCategories.map(c => c.id) || [];
		const CategoryNotInDB = categories.some(id => !DBCategoriesIds.includes(id));
		if (CategoryNotInDB) throw 'all categories must be loaded first';
		return Product.create({
			name: name,
			description: description || '',
			price: price || 0,
			stock: stock || 0
		})
	})
	.then(product => product.setCategories(categories))
	.then(res => {
		return Product.findOne({
			include: Category ,
			where: { name: name }
		})
	})
	.then(product => res.send(product))
	.catch(next)
});

server.put('/:id', (req, res, next) => {
	const id = req.params
	const { name, description, price, stock } = req.body;

	if (!name) {
		return res.status(400).send('Error !name');
	}
	if (!description && !price && !stock) {
		return res.status(400).send('At least one attribute (description, price or stock) of product is needed to modify it');
	}

	let atributesToUpdate = {};
	if (description) {
		atributesToUpdate.description = description;
	}
	if (price) {
		atributesToUpdate.price = price;
	}
	if (stock) {
		atributesToUpdate.stock = stock;
	}

	Product.update(
		atributesToUpdate,
		{ where: { id: id } }
	).then(product => res.send(product))
	.catch (next);
});

server.put('/categories/:id', (req, res, next) => {
	const {id} = req.params;	
	const {categories} = req.body;	
	if (!id) return res.status(400).send('Error !ID');
	if (!categories) return res.status(400).send('Error !categories');	
	let producto;
	Product.findByPk(id)
	.then(product=>{
		if(!product) throw `Error !product`
		producto=product;
		return Category.findAll();
	})	
	.then(DBCategories => {
		const DBCategoriesIds = DBCategories.map(c => c.id) || [];
		const CategoryNotInDB = categories.some(id => !DBCategoriesIds.includes(id));
		if (CategoryNotInDB) throw 'all categories must be loaded first';
		return producto.setCategories(categories)
	})
	.then(product => res.send(product))
	.catch(next)
})
module.exports = server;
