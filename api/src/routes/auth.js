const server = require('express').Router();
const user = require('../controllers/user');
const { forGuest } = require('../middlewares/authenticate')
const {
    login,
    loginFacebook,
    loginFacebookSuccess
} = require('../middlewares/passport')

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

server.get('/facebook', loginFacebook);
server.get('/facebook/success', loginFacebookSuccess);

module.exports = server;