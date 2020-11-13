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
        return User.findAll({
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


    create: function (idUser){
        let userPromise = User.findByPk(idUser)
        let cartPromise = Cart.create()
        return Promise.all([userPromise , cartPromise])
        .then(([user,cart])=> {
            user.addCart(cart)
        })
        .then(()=> this.cartOf(idUser))
    },

    changeCart: function(idCart, { products }){
        const promise = products.map(p => {
            Order.findOne({
                where:{
                    cartId: idCart,
                    productId: p.id
                }
            })
            .then(order => {
                if(order){
                    if(p.order.quantity > 0){
                        order.update({
                            quantity: p.order.quantity
                        })
                    }else{
                        order.destroy()
                    }
                }
            })
        })
        const cartPromise = Cart.findOne({
            where:{
                id: idCart
            }
        })
        return Promise.all([promise, cartPromise])
        .then((r) => this.cartOf(r[1].userId))
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
    },

    cartComplete: function(idCart){
        return Cart.findOne({
            where:{
                id: idCart
            },
            include:{
                model: User
            }
        })
        .then(cart => {
            /* if(!cart.user.name || !cart.user.email || !cart.user.password){
                throw "The user must be logged in "
            }else{ */
                return cart.update({
                    state: 'completed'
                })
                .then(cart => this.allCarts(cart.userId))
           /*  } */
           .then(user => {
                const cartPromise = Cart.create({
                    state: 'in process'
                })
                const userPromise = User.findByPk(user.id)
                return Promise.all([cartPromise, userPromise])
                .then(([cart, user]) => (
                    Promise.all([
                        user.addCart(cart),
                    ])
                ))
                .then(([user]) => this.allCarts(user.id))
           })
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