const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll({ include: Category })
	.then(products => res.send(products))
	.catch(next);
});

server.get('/:id', (req, res, next) => {
	const {id} = req.params
	Product.findOne({
		where:{
			id: id
		},
		include: Category
	})
	.then(product => {
		if(!product) throw `product id: ${id} does not exist`
		res.send(product)
	})
	.catch(next)
});

server.get('/:category', (req, res, next) => {
	const { category } = req.params
	Category.findAll({
		where: {
			name: category
		},
		include: Product
	})
	.then (products => res.send(products))
	.catch(next)
})

server.delete('/', (req, res, next) => {
    const { name } = req.body
    if (!name) {
        throw 'Body must have a name'
    }
    Product.destroy({ 
		where: { 
			name: name 
		} 
	}).then(products => {
        res.status(200).json(products)
    }).catch(next)
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

server.put('/', (req, res, next) => {
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
		{ where: { name: name } }
	).then(product => res.send(product))
	.catch (next);
});

module.exports = server;
