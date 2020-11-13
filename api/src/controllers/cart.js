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

    create: function (idUser){
        let userPromise = User.findByPk(idUser)
        let cartPromise = Cart.create()
        return Promise.all([userPromise , cartPromise])
        .then(([user,cart])=> {
            user.addCart(cart)
        })
        .then(()=> this.cartOf(idUser))
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
    },
    getByStatus: function(status){
        return Cart.findAll({
            where: {
                state: status
            }
        })
    },
    addProduct: function({quantity,cartId,productId}){
        let productPromise = Product.findByPk(productId)
        let cartPromise = Cart.findByPk(cartId)
        return Promise.all([productPromise,cartPromise])
        .then(([product, cart])=>{
            //Asignamos producto a carrito
            cart.addProduct(product, {
                //Al order le asignamos el precio actual
                //del producto y cantidad que me dice el cliente
                through: {
                    price: product.price,
                    quantity
                }
            })
        })
        .then(() => this.read())
    },
}