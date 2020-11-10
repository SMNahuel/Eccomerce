const { Product, Category, Image } = require('../db.js');
const { Op } = require("sequelize");

module.exports = {
    read: function() {
        return Product.findAll({
            attributes: ['id', 'name', 'description', 'price', 'stock'],
            order: ["id"],
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name', 'description'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
    },


    create: function({ name, description, price, stock, categories }) {
        const productPromise = Product.findOrCreate({
            where: {
                name
            },
            defaults: {
                description,
                price,
                stock
            }
        })
        .then(r => r[0])

        return this._setCategories(productPromise, categories)
        .then(() => this.read())
    },


    _setCategories: function(productPromise, categories = []) {
        const categoriesPromise = Category.findAll({
            attributes: ['id']
        })
        .then(c => c.map(c => c.id))
        .then(dbCategories => (
            categories.filter(category => (
                dbCategories.includes(category)
            ))
        ))
        

        return Promise.all([productPromise, categoriesPromise])
        .then(([product, categories]) => (
            product.setCategories(categories)
        ))
    },


    update: function(id, { name, description, price, stock, categories }) {
        let atributesToUpdate = {};
        if (name) atributesToUpdate.name = name;
        if (description) atributesToUpdate.description = description;
        if (price) atributesToUpdate.price = price;
        if (stock) atributesToUpdate.stock = stock;

        const productPromise = Product.update(
            atributesToUpdate,
            { 
                where: { 
                    id
                }
            }
        )
        .then(() => Product.findByPk(id))

        return this._setCategories(productPromise, categories)
        .then(() => this.read())
    },


    updateCategories: function(id, categories) {
        const productPromise = Product.findByPk(id)

        return this._setCategories(productPromise, categories)
        .then(() => this.read())
    },


    delete: function(id) {
        return Product.destroy({
            where: {
                id
            }
        })
        .then(() => this.read())
    },

    search: function(key) {
        return Product.findAll({ 
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${key}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${key}%`
                        }
                    }
                ]
            },
            attributes: ['id', 'name', 'description', 'price', 'stock'],
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name', 'description'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
    },

    detail: function(id) {
        return Product.findOne({
            where: {
                id
            },
            attributes: ['id', 'name', 'description', 'price', 'stock'],
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name', 'description'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
        .then(product => {
            if(!product) throw `product id: ${id} does not exist`
            return product
        })
    },

    categoryFilter: function(id) {
        return Category.findOne({
            where: { 
                id
            },
            attributes: ['id', 'name', 'description'],
            include: {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'stock'],
                through: {
                    attributes: []
                },
                include:{
                    model: Image,
                    attributes: ['id', 'url'],
                    through: {
                        attributes: []
                    }
                }
            }
        })
    },


    setImages: function(id, images) {
        
        let productPromise = Product.findByPk(id)

        let imagesPromise = images.map(image => (
            Image.findOrCreate({
                where: {
                    fileName: image.filename
                }
            })
        ))

        return Promise.all([productPromise, ...imagesPromise])
        .then(([product, ...images]) => product.setImages(images.map(i => i[0])))
        .then(() => this.read())
    }
}