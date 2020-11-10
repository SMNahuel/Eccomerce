const { Order } = require('../db.js');
const { Op } = require("sequelize");

module.exports = {
    read: function(){
        return Order.findAll({
            attributes: ['id', 'quantity', 'price']
        })
    },
    search: function(idOrder){
        return Order.findAll({
            where: {
                id: idOrder
            }
        })
    },
    create: function({quantity, price}){
        return Order.findOrCreate({
            where:{
                quantity: quantity,
                price: price
            }
        })
        .then(() => this.read())
    },
}