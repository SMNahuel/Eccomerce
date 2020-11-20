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
        return Review.findOne({where:{ userId, productId }})
        .then(review => {
            if (review) {
                return review.update({message, qualification})
            } else {
                return Review.create({userId, productId, message, qualification})
            }
        })
        .then(()=>this.byProduct(productId))
    },

    delete: function(userId, productId){
        return Review.findOne({where: { userId, productId }})
        .then(review => review.destroy())
        .then(()=>this.byProduct(productId))
    }
}