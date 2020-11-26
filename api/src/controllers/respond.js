const { Respond } = require('../db.js')
const comment = require('./comment')

function create(message, userId, commentId) {
    return Respond.create({message, userId, commentId})
    .then(() => comment.readByComment(commentId))
}

function update(id, message, userId) {
    return Respond.findByPk(id)
    .then(respond => {
        if (!respond) throw 'The respond does not exist'
        if (respond.userId !== userId) throw 'Only the owner of a respond can edit it'
        return respond.update({message})
    })
    .then(r => comment.readByComment(r.commentId))
}

function deletee(id, userId) {
    let commentId;
    return Respond.findByPk(id)
    .then(respond => {
        if (!respond) throw 'The respond does not exist'
        if (respond.userId !== userId) throw 'Only the owner of a respond can delete it'
        commentId = respond.commentId
        return Respond.destroy({where: {id}})
    })
    .then(() => comment.readByComment(commentId))
}

function adminDelete(id) {
    let commentId;
    return Respond.findByPk(id)
    .then(respond => {
        if (!respond) throw 'The respond does not exist'
        commentId = respond.commentId
        return Respond.destroy({where: {id}})
    })
    .then(() => comment.readByComment(commentId))
}

module.exports = {
    create,
    update,
    deletee,
    adminDelete
}