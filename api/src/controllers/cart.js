const { Cart, Order, User } = require('../db.js');

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
    },

    create: function (idUser, idOrder){
        Order.findByPk({
            where:{
                id: idOrder
            }
        })
    }
}