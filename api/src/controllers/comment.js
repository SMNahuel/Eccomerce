const { Comment, Respond, User } = require('../db.js')

function read(productId) {
    return Comment.findAll({
        where: {productId},
        attributes: ['id', 'message'],
        order: [['id', 'ASC']],
        include: [{
            model: User,
            attributes: ['id', 'name']
        },{
            model: Respond,
            attributes: ['id', 'message'],
            order: [['id', 'ASC']],
            include: {
                model: User,
                attributes: ['id', 'name']
            }
        }]
    })
}

function create(message, userId, productId) {
    return Comment.create({message, userId, productId})
    .then(() => read(productId))
}

function update(id, message, userId) {
    return Comment.findByPk(id)
    .then(comment => {
        if (!comment) throw 'The comment does not exist'
        if (comment.userId !== userId) throw 'Only the owner of a comment can edit it'
        return comment.update({message})
    })
    .then(c => readByComment(c.id))
}

function deletee(id, userId) {
    let productId
    return Comment.findByPk(id)
    .then(comment => {
        if (!comment) throw 'The comment does not exist'
        if (comment.userId !== userId) throw 'Only the owner of a comment can delete it'
        productId = comment.productId
        return Comment.destroy({where: {id}})
    })
    .then(Respond.destroy({where: {commentId: id}}))
    .then(() => read(productId))
}

function adminDelete(id) {
    let productId
    return Comment.findByPk(id)
    .then(comment => {
        if (!comment) throw 'The comment does not exist'
        productId = comment.productId
        return Comment.destroy({where: {id}})
    })
    .then(Respond.destroy({where: {commentId: id}}))
    .then(() => read(productId))
}

function readByComment(commentId) {
    return Comment.findByPk(commentId)
    .then(comment => read(comment.productId))
}

module.exports = {
    read,
    create,
    update,
    deletee,
    adminDelete,
    readByComment
}