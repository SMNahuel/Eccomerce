const { User, Rol } = require('../db.js');

module.exports = {
    login: function (email, password) {
        return User.findOne({
            attributes: ['id', 'email', 'password', 'name', 'rolId'],
            where: { email },
            include: {
                model:Rol,
                attributes: ['name']
            }
        })
        .then(user => matchPassword(user, password))
        .then(checkBan)
        .then(user => session(user))
    },

    register: function ({ email, name, password}) {
        return User.findOne({
            attributes: ['id'],
            where: { email }
        })
        .then(user => {
            if (user) throw `User ${email} already exists`
            return User.create({ name, email, password, rolId: 2})
        })
        .then(user => session(user))
    },

    anonymous: function () {
        return User.create({rolId: 2})
    },

    getById: function(userId){
        return User.findOne({
            attributes: ['email', 'name', 'rolId'],
            where:{ id: userId },
            include: {
                model:Rol,
                attributes: ['name']
            }
        })
        .then(user => session(user))
    },

    exists: function(id){
        return User.findByPk(id)
        .then(r => !!r)
    },

    rol: function(idUser){
        return User.findByPk(idUser)
        .then(r => r.rolId)
    },

    read: function(){
        return User.findAll({
            attributes: ['id', 'email', 'name', 'rolId'],
            include: {
                model:Rol,
                attributes: ['name']
            },
            order: ['id']
        })
    },

    setAdmin: function(id){
        return User.findByPk(id)
        .then(ownerProtect)
        .then(user => user.update({rolId: 3}))
        .then(() => this.read())
    },

    setGuest: function(id){
        return User.findByPk(id)
        .then(ownerProtect)
        .then(user => user.update({rolId: 2}))
        .then(() => this.read())
    },

    ban: function(id){
        return User.findByPk(id)
        .then(ownerProtect)
        .then(user => user.update({rolId: 1}))
        .then(() => this.read())
    },

    changePassword: function(id, oldPassword, newPassword){
        return User.findByPk(id)
        .then(user => matchPassword(user, password))
        .then(user => {
            user.password = newPassword;
            return user.save();
        })
        .then(() => 'success')
    },

    update: function(id, { name, email}){
        let changeAttributes = {};
        if(name) {
            changeAttributes.name = name;
        }
        if(email){
            changeAttributes.email = email;
        }
        return User.update(
            changeAttributes, 
            { where: { id } }
        )
        .then(() => this.read())
    },

    session: function (user){
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            rolId: user.rolId,
            rol: user.rol.name || 'guest',
        }
    },
    
    matchPassword: function (user, password) {
        if (user.password !== password) throw `Wrong password`;
        return user;
    },
    
    checkBan: function (user) {
        if (user.rolId < 2) throw 'Your account has been banned contact the company to recover your account'
        return user;
    },

    ownerProtect: function (user) {
        if (user.rolId > 3) throw `the role of an owner cannot be changed`
        return user;
    }
}