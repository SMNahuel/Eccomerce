const { Cart, Order, Product, User } = require('../db.js');

module.exports = {
    read: function(idUser){
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
                },
                {
                    model: User,
                    where:{
                        id: idUser
                    },
                    attributes:['id'],
                    through:{
                        attributes:[]
                    }
                }
            ]
        })
    }
}