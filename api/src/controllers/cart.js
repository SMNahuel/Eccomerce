const { Cart, Order, User, Product } = require('../db.js');

module.exports = {
    read: function(idUser){
        return Cart.findAll({
            attributes: ['id'],
            include:[
                {
                    model: User,
                    attributes: ['id', 'name'],
                    where:{
                        id: idUser
                    }
                },
                {
                    model: Order,
                    attributes:['id', 'quantity', 'price']
                }
            ]
        })
    },

    create: function (idUser, idOrder){
        let cart
        const cartUser = Cart.findOrCreate({
            where:{
                userId: idUser,
                state: 'in process'
            },
            defaults:{
                state: 'in process',
                userId: idUser
            }
        })
        .then(r => cart = r[0].get({plain:true}))
        const order = Order.findByPk(idOrder)
        return Promise.all([cartUser, order])
        .then((r) => {
            r[1].update({
                cartId: r[0].id
            })
        })
        .then(() => this.read(idUser))
    },

    createAnonimus: function({ productId, quantity }){
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

    cartOf: function(userId){
        return Cart.findAll({
            where:{
                userId: userId
            },
            attributes: ['id', 'state'],
            include: {
                model: Product,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['price', 'quantity']
                }
            }
        })
    }
}