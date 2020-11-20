const { Review, User, Image } = require('../db.js');

module.exports = {
    byProduct: function(id){
        return Review.findAll({
            where:{
                productId: id
            },
            attributes: ['id', 'qualification', 'message', 'productId', 'userId'],
            order: ["createdAt"],
            include: {
                model: User,
                attributes: ['name'],
                include: {
                    model: Image,
                    attributes: ['url']
                }
            }
        })
    },

    byUser: function(id){
        return Review.findAll({
            where:{
                userId: id
            },
            attributes: ['id', 'qualification', 'message', 'productId', 'userId'],
            order: ["createdAt"],
        })
    },

    create: function(userId, productId, {message, qualification}){
        return Review.findOrCreate({
            where:{
                userId,
                productId
            },
            defaults: {
                message,
                qualification
            }
        })
        .then(()=>this.byProduct(productId))
    },

    update: function(userId, productId, {message, qualification}){
        let atributesToUpdate = {};
        if (qualification) atributesToUpdate.qualification = qualification;
        if (message) atributesToUpdate.message = message;
        return Review.update(
            atributesToUpdate,
            {
                where:{
                    userId,
                    productId
                }
            }
        )
        .then(()=>this.byProduct(productId))
    },

    delete: function(userId, productId){
        return Review.destroy({
            where: {
                userId,
                productId
            }
        })
        .then(()=>this.byProduct(productId))
    }
}