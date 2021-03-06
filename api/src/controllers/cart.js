const { Cart, Product, Image, Review, User} = require('../db.js');
const order = require('./order');

module.exports = {
    cartOf: function(userId){
        return Cart.findOne({
            where:{
                userId: userId,
                state:'cart'
            },
            attributes: ['id', 'state', 'userId'],
            include: {
                model: Product,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['price', 'quantity']
                }
            }
        })
    },

    addToCartAnonimus: function({ productId, quantity }, cartId){
        const cartPromise = cartId ? Cart.findByPk(cartId) : Cart.create()
        const productPromise = Product.findByPk(productId)
        return Promise.all([cartPromise, productPromise])
        .then(([cart, product]) => {
            let stockRest = product.stock - quantity
            if (stockRest < 0) throw 'Not enough stock'
            cartId = cart.id
            return Promise.all([
                cart.addProduct(product, {
                    through: {
                        price: product.price,
                        quantity
                    }
                }),
                product.update({stock:stockRest})
            ])
        })
        .then(() => this.getById(cartId))
    },

    addToCart: function(userId, { productId, quantity }){
        const cartPromise = Cart.findOrCreate({
            where:{
                userId: userId,
                state: 'cart'
            }
        })
        .then(r => r[0])
        const productPromise = Product.findByPk(productId)
        return Promise.all([cartPromise, productPromise])
        .then(([cart, product]) => {
            let stockRest = product.stock - quantity
            if (stockRest < 0) throw 'Not enough stock'
            return Promise.all([
                cart.addProduct(product, {
                    through: {
                        price: product.price,
                        quantity
                    }
                }),
                Product.update({stock:stockRest},{where:{id:productId}})
            ])
        })
        .then(() => this.cartOf(userId))
    },

    belongsTo: function(cartId, userId){
        return Cart.findOne({
            where:{
                id: cartId,
                userId: userId
            }
        })
        .then(r => !!r)
    },

    update: function(userId, {id, products}){
        return this.belongsTo(id, userId)
        .then(belongsToUser => {
            if (!belongsToUser){
                throw 'The cart must belong to the user to be updated'
            }
            return Promise.all(products.map(p => order.update(id, p)))
        })
        .then(() => this.cartOf(userId))
    },

    create: function(userId, {id, products, email}){
        return this.belongsTo(id, userId)
        .then(belongsToUser => {
            if (!belongsToUser){
                throw 'The cart must belong to the user to be created'
            }
            return Promise.all(products.map(p => order.updateWithActualPrices(id, p)))
        })
        .then(() => Cart.update({state:'created', emailTo:email},{where:{id:id}}))
        .then(() => this.cartOf(userId))
    },

    cancel: function(userId, {id, products}){
        return this.belongsTo(id, userId)
        .then(belongsToUser => {
            if (!belongsToUser){
                throw 'The cart must belong to the user to be created'
            }
            return Promise.all(products.map(p => order.release(id, p)))
        })
        .then(() => Cart.update({state:'canceled'},{where:{id:id}}))
        .then(() => this.cartOf(userId))
    },

    process: function({id}){
        return Cart.update({state:'processing'},{where:{id:id}})
        .then(() => this.getAll())
    },
    changeState: function(id, state){

        return Cart.update({state:state},{where:{id:id}})
        .then(() => this.getAll())
    },
    orders: function(userId){
        return Cart.findAll({
            where:{
                userId: userId
            },
            attributes: ['id', 'state'],
            order: ['state'],
            include: {
                model: Product,
                attributes: ['id', 'name'],
                include:[{
                    model: Image,
                    attributes: ["url"],
                    through: {
                        attributes: []
                    }
                },{
                    model: Review,
                    attributes: ["id","qualification","message"],
                    where: {userId},
                    required: false
                }],
                through: {
                    attributes: ['price', 'quantity']
                }
            }
        })
    },

    getById: function(id){
        return Cart.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'state'],
            order: ['state'],
            include: {
                model: Product,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['price', 'quantity']
                }
            }
        })
    },

    getAll: function(){
        return Cart.findAll({
            attributes: ['id', 'state', 'createdAt', 'updatedAt'],
            order: ['state'],
            include: [{
                model: Product,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['price', 'quantity']
                }
            },{
                model: User,
                attributes: ['id','name', 'email']
            }]
        })
    }
}