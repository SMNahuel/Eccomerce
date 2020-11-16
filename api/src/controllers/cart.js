const { Cart, Order, User, Product } = require('../db.js');
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
                attributes: ['id', 'name']/* ,
                through: {
                    attributes: ['price', 'quantity']
                } */
            }
        })
    },

    addToCartAnonimus: function({ productId, quantity }){
        const userPromise = User.create()
        const cartPromise = Cart.create()
        const productPromise = Product.findByPk(productId)
        return Promise.all([userPromise, cartPromise, productPromise])
        .then(([user, cart, product]) => (
            Promise.all([
                user.addCart(cart),
                cart.addProduct(product, {
                    through: {
                        price: product.price,
                        quantity
                    }
                })
            ])
        ))
        .then(([user]) => this.cartOf(user.id))
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
        .then(([cart, product]) => (
            cart.addProduct(product, {
                through: {
                    price: product.price,
                    quantity
                }
            })
        ))
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
        return Promise.all(products.map(p => order.update(id, p)))
        .then(() => this.cartOf(userId))
    },

    create: function(userId, {id, products}){
        return Promise.all(products.map(p => order.updateWithActualPrices(id, p)))
        .then(() => Cart.update({state:'created'},{where:{id:id}}))
        .then(() => this.cartOf(userId))
    },

    cancel: function(userId, {id}){
        return Cart.update({state:'canceled'},{where:{id:id}})
        .then(() => this.cartOf(userId))
    },

    allCarts: function(){
        return Cart.findAll({
            attributes: ['id', 'state'],
            include: {
                model: Product,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['price', 'quantity']
                }
            }
        })
    },

    getByStatus: function(status){
        return Cart.findAll({
            where: {
                state: status
            }
        })
    },

}