const { User, Order, Cart } = require('../db.js');

module.exports = {
    read: function(){
        return User.findAll({
            attributes: ['id', 'name', 'email'],
            order:["id"]
        })
    },

    create: function({ name, email, password }) {
        return User.findOrCreate({
            where: {
                name: name,
                email: email,
                password: password
            }
        })
        .then(() => this.read())
    },

    update: function(id, { name, email, password }){
        let changeAttributes = {};
        if(name) {
            changeAttributes.name = name;
        }
        if(email){
            changeAttributes.email = email;
        }
        if(password){
            changeAttributes.password = password
        }
        return User.update(
            changeAttributes, {
                where: {
                    id: id
                }
            }
        )
        .then(() => this.read())
    },

    delete: function(id){
        return User.destroy({
            where: {
                id: id
            }
        })
        .then(() => this.read())
    },
    search: function(idUser){
        Cart.findOne({
            attributes: ['id', 'state', 'userId'],
            where:{
                userId: idUser
            }
        })
        .then(console.log)

    }
}