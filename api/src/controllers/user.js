const { User, Order, Cart, Rol } = require('../db.js');

module.exports = {
    login: function ({ email, password }) {
        return User.findOne({
            attributes: ['id', 'email', 'password', 'name'],
            where: { email },
            include: {
                model:Rol,
                attributes: ['name']
            }
        })
        .then(user => {
            if (user.password !== password) throw new Error('wrong password')
            return [user.id, {
                email: user.email,
                name: user.name,
                rol: user.rol.name,
            }]
        })
    },

    register: function ({ email, name, password}) {
        return User.findOne({
            attributes: ['id'],
            where: { email }
        })
        .then(user => {
            if (user) throw new Error(`User ${email} already exists`)
            return User.create({ name, email, password, rolId: 1})
        })
        .then(user => [user.id, {
            email: user.email,
            name: user.name,
            rol: 'guest',
        }])
    },
    

    exists: function(id){
        return User.findByPk(id)
        .then(r => !!r)
    },

    read: function(){
        return User.findAll({
            attributes: ['id', 'password', 'email'],
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
    },

    rol: function(idUser){
        return User.findOne({
            attributes: ['id'],
            where: {
                id: idUser
            },
            include: {
                model:Rol,
                attributes: ['name']
            }
        })
        .then(r => r.rol.name)
    }
}