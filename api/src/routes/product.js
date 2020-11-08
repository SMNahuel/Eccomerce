const server = require('express').Router();
const { Product, Category } = require('../db.js');
const { Op } = require("sequelize");

server.get('/', (req, res, next) => {
	Product.findAll({ include: Category })
	.then(products => res.send(products))
	.catch(next);
});

server.get('/search', (req, res, next) => {
	const { key } = req.query;
	Product.findAll({ 
		where:{[Op.or]: [
			{name: {[Op.substring]: key}},
			{description: {[Op.substring]: key}}
		]}
	})
	.then(r => res.send(r))
	.catch(next);
})

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

server.post('/', (req, res, next) => {
	const { name, description, price, stock } = req.body;
	var { categories } = req.body;
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
		return  Product.findAll({ include: Category })
	})
	.then(products => res.send(products))
	.catch(next);
});

server.put('/:id', (req, res, next) => {
	const { id } = req.params
	const { name, description, price, stock } = req.body;
	var { categories } = req.body;
	if (!name && !description && !price && !stock && !categories) {
		return res.status(400).send('At least one attribute (name, description, price, stock or categories) of product is needed to modify it');
	}

	let atributesToUpdate = {};
	if (name) atributesToUpdate.name = name;
	if (description) atributesToUpdate.description = description;
	if (price) atributesToUpdate.price = price;
	if (stock) atributesToUpdate.stock = stock;
	if (!categories) categories = [];
	
	return Product.update(
		atributesToUpdate,
		{ where: { id: id } }
	)
	.then(product => Category.findAll())
	.then(DBCategories => {
		const DBCategoriesIds = DBCategories.map(c => c.id) || [];
		const CategoryNotInDB = categories.some(id => !DBCategoriesIds.includes(id));
		if (CategoryNotInDB) throw 'all categories must be loaded first';
		return Product.findByPk(id)
	})
	.then(product => product.setCategories(categories))
	.then(product => Product.findAll({ include: Category }))
	.then(products => res.send(products))
	.catch(next);
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

server.delete('/:id', (req, res, next) => {
	const { id } = req.params;
    Product.destroy({ 
		where: {id: id} 
	})
	.then(product => Product.findAll({ include: Category }))
	.then(products => res.send(products))
	.catch(next);
});

module.exports = server;
