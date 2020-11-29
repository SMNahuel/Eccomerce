const { User, Rol, Image, Cart, Product } = require('../db.js');

module.exports = {
    login: function (email, password) {
        return User.findOne({
            attributes: ['id', 'email', 'password', 'name', 'rolId'],
            where: { email },
            include: [{
                model:Rol,
                attributes: ['name']
            }, {
                model:Image,
                attributes: ['url']
            }]
        })
        .then(user => this.matchPassword(user, password))
        .then(this.checkBan)
        .then(this.session)
    },
    logingProvider: function (provider, providerId, name, email) {
        return User.findOne({where:{email}})
        .then(user => {
            if (!user) return User.create({ email, name, rolId: 3, [provider + 'Id']: providerId})
            return user.update({[provider + 'Id']: providerId})
        })
        .then(this.checkBan)
        .then(this.session)
    },
    register: function ({ email, name, password}) {
        return User.findOne({
            attributes: ['id'],
            where: { email }
        })
        .then(user => {
            if (user) throw `User ${email} already exists`
            return User.create({ name, email, password, rolId: 3})
        })
        .then(user => this.getById(user.id))
    },
    anonymous: function () {
        return User.create({rolId: 2})
    },
    getById: function(userId){
        return User.findOne({
            attributes: ['id', 'email', 'name', 'rolId', 'pais', 'provincia', 'localidad', 'codigoPostal', 'calle', 'num', 'departamento', 'telefono'],
            where:{ id: userId },
            include: [{
                model:Rol,
                attributes: ['name']
            }, {
                model:Image,
                attributes: ['url']
            }]
        })
        .then(this.session)
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
        .then(this.ownerProtect)
        .then(user => user.update({rolId: 4}))
        .then(() => this.read())
    },

    setGuest: function(id){
        return User.findByPk(id)
        .then(this.ownerProtect)
        .then(user => user.update({rolId: 3}))
        .then(() => this.read())
    },

    ban: function(id){
        return User.findByPk(id)
        .then(this.ownerProtect)
        .then(user => user.update({rolId: 1}))
        .then(() => this.read())
    },

    changePassword: function(id, oldPassword, newPassword){
        return User.findByPk(id)
        .then(user => this.matchPassword(user, oldPassword))
        .then(user => user.update({password: newPassword}))
        .then(() => 'success')
    },

    update: function(id, { name, email}){
        let changeAttributes = {};
        if (name) changeAttributes.name = name; 
        if (email) changeAttributes.email = email; 
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
            rol: user.rol ? user.rol.name : 'guest',
            image: user.image && user.image.url,
            pais: user.pais,
            provincia: user.provincia,
            localidad: user.localidad,
            codigoPostal: user.codigoPostal,
            calle: user.calle,
            num: user.num,
            departamento: user.departamento,
            telefono: user.telefono
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
        if (user.rolId > 4) throw `the role of an owner cannot be changed`
        return user;
    },
    
    setImage: function (id, img) {
        let userPromise = User.findByPk(id);
        let imagePromise = Image.findOrCreate({
            where: {
                fileName: img.filename
            }
        })
        .then(r => r [0])
        return Promise.all([userPromise, imagePromise])
        .then(([user, image])=> user.setImage(image))
        .then(()=>(this.getById(id)))
    },

    getPurchasedProducts: function (userId) {
        return Product.findAll({
            attributes: ['id'],
            include: {
                model: Cart,
                attributes: [],
                where: {
                    userId,
                    state: 'processing'
                },
                through: {
                    attributes: []
                }
            }
        })
        .then(poducts => poducts.map(poduct => poduct.id))
    },

    addCart: function (userId, cartId) {
        return User.findByPk(userId)
        .then(user => user.addCart(cartId))
    },

    updateChanges: function(userId, changes){
        return User.update(
            changes, 
            { where: { id: userId } }
        )
        .then(() => this.getById(userId))
    },

    getByEmail: function(email){
        return User.findOne({where: {email}, attributes: ['id', 'email', 'name', 'rolId']})
        .then(this.session)
    },

    setNewPassword: function(email, newPassword){
        return User.findOne({where: {email}})
        .then(user => user.update({password: newPassword}))
        .then(() => 'success')
    },
    userByEmail: function(email){
        return User.findOne({where: {email}, attributes: ['email','id']})
        .then(r => r )
    },
}