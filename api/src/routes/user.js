const server = require('express').Router();
const user = require('../controllers/user');
const {ProfileImageUploader} = require('../middlewares/uploadImg');
const {login, logout, forAdmin, forGuest} = require('../middlewares/authenticate')

// Ruta que permite logearse
server.post('/login', login, (req, res, next) => {
    return res.send(req.user);
})

// Ruta que permite deslogearse
server.get('/logout', logout)

// Ruta que trae los datos del usuario
server.get('/me', (req,res,next)=>{
    return res.send(req.user || {});
})

// Ruta que permite registrarse
server.post('/register', (req, res, next) => {
    const { email, name, password } = req.body;
    if (!email) {
        return res.status(400).send('Body must have a email for register')
    }
    if (!name) {
        return res.status(400).send('Body must have a name for register')
    }
    if (!password) {
        return res.status(400).send('Body must have a password for register')
    }
    user.register(req.body)
    .then(session => {
        req.login(session, err => err && next(err))
        return res.send(session);
    })
    .catch(next)
})

// Ruta para cambiar de password como usuario
server.put('/password', forGuest, (req, res, next) => {
    
    const { oldPassword, newPassword }= req.body;
    if(!oldPassword){
        return res.status(400).send('I need the old password to modify the password')
    }
    if(!newPassword){
        return res.status(400).send('I need the new password to modify the password')
    }
    user.changePassword(req.user.id, oldPassword, newPassword)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que te devuelve todos los usuarios
server.get('/admin', forAdmin, (req, res, next) => {
    user.read()
    .then(r => res.send(r))
})

// Ruta que permite promocionar a un usuario a admin
server.put('/admin/promote', forAdmin, (req, res, next) => {
    const { userId } = req.body;
    if(!userId){
        return res.status(400).send('an id is needed to promote a user')
    }
    user.setAdmin(userId)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que permite demotear a un usuario a guest
server.put('/admin/demote', forAdmin, (req, res, next) => {
    const { id } = req.body;
    if(!id){
        return res.status(400).send('an id is needed to demote a user')
    }
    user.setGuest(id)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que permite banear a un usuario
server.put('/admin/ban', forAdmin, (req, res, next) => {
    const { id } = req.body;
    if(!id){
        return res.status(400).send('an id is needed to ban a user')
    }
    user.ban(id)
    .then(r => res.send(r))
    .catch(next)
})

//Ruta que permite cargar imagen de perfil
server.post('/image', forGuest, ProfileImageUploader, (req, res, next) => {
	if (!req.file) {
		return res.status(400).send(`the image (key:'image') are required to set them on the profile`);
	}
    user.setImage(req.user.id, req.file)
	.then(r => res.send(r))
	.catch(next);
});

//Ruta que me trae los id de los productos comprados
server.get('/purchased', (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.send([]);
    } else {
        user.getPurchasedProducts(req.user.id)
        .then(r => res.send(r))
        .catch(next);
    }
})

module.exports = server;