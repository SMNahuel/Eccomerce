const { Cart, Order, Product } = require('../db.js');

module.exports = {
    read: function(){
        return Cart.findAll({
            attributes:['id'],
            include:[
                {
                    model: Order,
                    attributes:['id', 'quantity'],
                    through:{
                        attributes:[]
                    }
                },
                {
                    model: Product,
                    attributes:['id', 'name', 'price'],
                    through:{
                        attributes:[]
                    }
                }
            ]
        })
    }
}