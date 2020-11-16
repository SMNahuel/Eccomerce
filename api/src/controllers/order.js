const { Order, Product } = require('../db.js');

module.exports = {
    update: function(cartId, product){
        Order.findOne({
            where:{
                cartId: cartId,
                productId: product.id
            }
        })
        .then(order => {
            if(order){
                if(Number(product.order.quantity) > 0){
                    return order.update({
                        quantity: product.order.quantity
                    })
                }else{
                    return order.destroy()
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
                if(Number(product.order.quantity) > 0){
                    return order.update({
                        quantity: product.order.quantity,
                        price: dbProduct.price
                    })
                }else{
                    return order.destroy()
                }
            }
        })
    }
}