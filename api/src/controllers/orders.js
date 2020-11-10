const { Order } = require('../db.js');

module.exports = {
    read: function(){
        return Order.findAll({
            attributes: ['id', 'quantity', 'price']
        })
    }
}