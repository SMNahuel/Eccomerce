const { Cart, Order, User, Product } = require('../db.js');

module.exports = {

    createAnonimus: function({ productId, quantity }, cookieId){
        if(cookieId){
            return this.addAnonimus(productId, quantity, cookieId)
        }else{
            const userPromise = User.create()
            const cartPromise = Cart.create({
                state: 'in process'
            })
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
        }
    },

    cartOf: function(userId){
        return Cart.findAll({
            where:{
                userId: userId,
                state:'in process'
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

    addAnonimus: function(productId, quantity, cookieId){
        const userPromise = User.findByPk(cookieId)
        const cartPromise = Cart.findOne({
            where:{
                userId: cookieId
            }
        })
        const productPromise = Product.findByPk(productId)
        return Promise.all([userPromise, cartPromise, productPromise])
            .then(([user, cart, product]) => (
                Promise.all([
                    user,
                    cart.addProduct(product, {
                        through: {
                            price: product.price,
                            quantity
                        }
                    }),
                ])
            ))
            .then(([user]) => this.cartOf(user.id))
    },

    allCarts: function(idUser){
        return User.findOne({
            where:{
                id: idUser
            },
            attributes: ['id'],
            include: {
                model: Cart,
                attributes: ['id', 'state'],
                include: {
                    model: Product,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: ['price', 'quantity']
                    }
                }
            } 
        })
    },

    changeCart: function(cartId, { products }){
        console.log(products)
    },

    delete: function(cartId){
        return Cart.findOne({
            where:{
                id: cartId
            }
        })
        .then(r => {
            const user = r.userId
            r.destroy()
            return this.allCarts(user)
        })
    }
}