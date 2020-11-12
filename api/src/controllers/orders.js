const { Order, Cart } = require('../db.js');
const { Op } = require("sequelize");

module.exports = {
    read: function(){
        return Cart.findAll()
    },
    search: function(status){
        return Cart.findAll({
            where: {
                state: status
            }
        })
    },
    create: function({quantity, price,cartId,productId}){
        return Order.findOrCreate({
            where:{
                quantity: quantity,
                price: price,
                cartId: cartId
            }
        })
        .then(() => this.read())
    },
}