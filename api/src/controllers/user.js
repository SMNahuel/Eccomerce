const { User, Rol } = require('../db.js');

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
            return User.create({ name, email, password, rolId: 2})
        })
        .then(user => [user.id, {
            email: user.email,
            name: user.name,
            rol: 'guest',
        }])
    },

    getById: function(userId){
        return User.findOne({
            attributes: ['email', 'name'],
            where:{ id: userId },
            include: {
                model:Rol,
                attributes: ['name']
            }
        })
        .then(user => ({
            email: user.email,
            name: user.name,
            rol: user.rol.name,
        }))
    },

    exists: function(id){
        return User.findByPk(id)
        .then(r => !!r)
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
    },

    read: function(){
        return User.findAll({
            attributes: ['id', 'email', 'name'],
            include: {
                model:Rol,
                attributes: ['name']
            },
            order: ['id']
        })
    },

    promote: function(id){
        return User.findByPk(id)
        .then(user => user.update({rolId: 1}))
        .then(() => this.read())
    },

    demote: function(id){
        return User.findByPk(id)
        .then(user => user.update({rolId: 2}))
        .then(() => this.read())
    },

    ban: function(id){
        return User.findByPk(id)
        .then(user => user.update({rolId: 3}))
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
}