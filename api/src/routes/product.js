const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll({ include: Category })
	.then(products => res.send(products))
	.catch(next);
});

server.post('/', (req, res, next) => {
	const {name, description, price, stock, categories} = req.body;
	if (!name) return res.status(400).send('Body must have a product name');
	Product.findOne({ where: { name: name }})
	.then(product => {
		if (product) throw 'the product [' + name + '] already exists';
		return Category.findAll();
	})
	.then(DBCategories => {
		DBCategoriesIds = DBCategories.map(c => c.id) || [];
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
	.catch(err => res.status(400).send(err))
});

module.exports = server;
