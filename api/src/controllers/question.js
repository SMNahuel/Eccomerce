const { Question, Product } = require('../db.js')
const reviews = require('./reviews.js')

module.exports = {

    read: function (id) {
        return Question.findAll({
            where: {
                productId: id
            },
            atrributes: ['message'],
            include: {
                model: Product,
                atrributes: ['id']
            }
        })
    },

    create: function (message, userId, productId) {
        return Question.findOne({
            where: {
                userId: userId,
                productId: productId
            }
        })
        .then(question => {
            if(question){
                return question.update({message})
            } else{
                return question.create({userId, productId, message})
            }
        })
    },

    delete: function (id) {
        return Question.findOne({
            where: {
                productId: id
            }
        })
            .then(question => question.destroy())
            .then(() => this.read())
    }
}