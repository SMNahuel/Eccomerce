const server = require('express').Router();
const user = require('../controllers/user');
const { ProfileImageUploader } = require('../middlewares/uploadImg');
const sendEmail = require('../utils/sendEmail');
const keysStore = require('../utils/keysStore');
const { forGuest } = require('../middlewares/authenticate');
const {
    login,
    loginFacebook,
    loginFacebookSuccess,
    loginGithub,
    loginGithubSuccess,
    loginGoogle,
    loginGoogleSuccess
} = require('../middlewares/passport');

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
        const { cartId } = req.cookies
        if (!cartId) {
            return res.send(session);
        } else {
            return user.addCart(session.id, cartId)
            .then(() => res.clearCookie('cartId').send(session))
            .catch(next)
        }
    })
})

// Ruta que permite logearse con local
server.post('/login', login, (req, res, next) => {
    const { cartId } = req.cookies
    if (!cartId) {
        return res.send(req.user);
    } else {
        return user.addCart(req.user.id, cartId)
        .then(() => res.clearCookie('cartId').send(req.user))
        .catch(next);
    }
})

// Ruta que permite deslogearse
server.get('/logout', (req, res) => {
    req.logout();
    return res.send({})
})

// Ruta que trae los datos del usuario
server.get('/me', (req,res,next)=>{
    return res.send(req.user || {});
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

// Ruta para cambiar de password como usuario
server.post('/forgottenPassword', (req, res, next) => {
    const { email }= req.body;
    if(!email){
        return res.status(400).send('A email is needed to reset the password by email')
    }
    user.getByEmail(email)
    .then(user => sendEmail.changePassword(email, {...user, key: keysStore.set(email)}))
    .then(r => res.send('Email sended'))
    .catch(next)
})

// Ruta para cambiar de password como usuario
server.put('/forgottenPassword', (req, res, next) => {
    const {key, newPassword }= req.body;
    if(!key){
        return res.status(400).send('A key is needed to reset the password')
    }
    if(!newPassword){
        return res.status(400).send('A newPassword is needed to reset the password')
    }
    const email = keysStore.get(key)
    if(!email) {
        return res.status(400).send("the key expired or doesn't match")
    }
    user.setNewPassword(email, newPassword)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que permite cargar imagen de perfil
server.post('/image', forGuest, ProfileImageUploader, (req, res, next) => {
	if (!req.file) {
		return res.status(400).send(`the image (key:'image') are required to set them on the profile`);
	}
    user.setImage(req.user.id, req.file)
	.then(r => res.send(r))
	.catch(next);
});

// Ruta que me trae los id de los productos comprados
server.get('/purchased', (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.send([]);
    } else {
        user.getPurchasedProducts(req.user.id)
        .then(r => res.send(r))
        .catch(next);
    }
})

// Rutas que permiten logearse con facebook
server.get('/facebook', loginFacebook);
server.get('/facebook/success', loginFacebookSuccess, (req, res, next) => {
    const { cartId } = req.cookies
    if (!cartId) {
        return res.send(req.user);
    } else {
        return user.addCart(req.user.id, cartId)
        .then(() => res.clearCookie('cartId').send(req.user))
        .catch(next);
    }
})
//Rutas que permiten logearse con Github
server.get('/github', loginGithub);
server.get('/github/success', loginGithubSuccess, (req, res, next) => {
    const { cartId } = req.cookies
    if (!cartId) {
        return res.send(req.user);
    } else {
        return user.addCart(req.user.id, cartId)
        .then(() => res.clearCookie('cartId').send(req.user))
        .catch(next);
    }
})
//Rutas que permiten logearse con Google
server.get('/google', loginGoogle);
server.get('/google/success', loginGoogleSuccess, (req, res, next) => {
    const { cartId } = req.cookies
    if (!cartId) {
        return res.send(req.user);
    } else {
        return user.addCart(req.user.id, cartId)
        .then(() => res.clearCookie('cartId').send(req.user))
        .catch(next);
    }
})

server.put('/update', (req, res, next) => {
    user.updateChanges(req.user.id, req.body)
    .then(r => res.send(r))
    .catch(next)
})


module.exports = server;