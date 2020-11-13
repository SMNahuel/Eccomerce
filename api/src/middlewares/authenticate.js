const user = require('../controllers/user');

module.exports = {
    forAdmin: (req, res, next) => {
        if (!req.cookies.user) {
            next(new Error('Debe estar autenticado para acceder a esta ruta'));
        }
        user.rol(req.cookies.user)
        .then(r => {
            if (r === 'admin') {
                next();
            } else {
                next(new Error('Debe ser guest para acceder a esta ruta'));
            }
        })
    },

    onlyForGuest: (req, res, next) => {
        if (!req.cookies.user) {
            next(new Error('Debe estar autenticado para acceder a esta ruta'));
        }
        user.rol(req.cookies.user)
        .then(r => {
            if (r === 'guest') {
                next();
            } else {
                next(new Error('Debe ser guest para acceder a esta ruta'));
            }
        })
    }
}