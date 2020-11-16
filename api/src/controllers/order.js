const { Order, Product } = require('../db.js');

module.exports = {
    update: function(cartId, product){
        const orderPromise = Order.findOne({
            where:{
                cartId: cartId,
                productId: product.id
            }
        })
        const productPromise = Product.findByPk(product.id)
        return Promise.all([orderPromise, productPromise])
        .then(([order, dbProduct]) => {
            if(order){
                let quantityDifference = order.quantity - product.order.quantity
                let stockRest = dbProduct.stock + quantityDifference
                if (stockRest < 0) throw new Error('Not enough stock')
                if(Number(product.order.quantity) > 0){
                    return Promise.all([
                        dbProduct.update({stock: stockRest}),
                        order.update({quantity: product.order.quantity})
                    ])
                }else{
                    return Promise.all([
                        dbProduct.update({stock: dbProduct.stock + order.quantity}),
                        order.destroy()
                    ])
                }
            }
        })
    },

    updateWithActualPrices:  function(cartId, product){
        const oredrPromise = Order.findOne({
            where:{
                cartId: cartId,
                productId: product.id
            }
        })
        const productPromise = Product.findByPk(product.id)
        Promise.all([oredrPromise, productPromise])
        .then(([order, dbProduct]) => {
            if(order){
                let quantityDifference = order.quantity - product.order.quantity
                let stockRest = dbProduct.stock + quantityDifference
                if (stockRest < 0) throw new Error('Not enough stock')
                if(Number(product.order.quantity) > 0){
                    return Promise.all([
                        dbProduct.update({stock: stockRest}),
                        order.update({
                            quantity: product.order.quantity,
                            price: dbProduct.price
                        })
                    ])
                }else{
                    return Promise.all([
                        dbProduct.update({stock: dbProduct.stock + order.quantity}),
                        order.destroy()
                    ])
                }
            }
        })
    },

    release: function(cartId, product){
        const orderPromise = Order.findOne({
            where:{
                cartId: cartId,
                productId: product.id
            }
        })
        const productPromise = Product.findByPk(product.id)
        Promise.all([orderPromise, productPromise])
        .then(([order, dbProduct]) => {
            if(order){
                return Promise.all([
                    dbProduct.update({stock: dbProduct.stock + order.quantity}),
                    order.destroy()
                ])
            }
        })
    }
}