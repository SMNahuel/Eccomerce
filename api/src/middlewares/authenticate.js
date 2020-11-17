const user = require('../controllers/user');

module.exports = {
    forAdmin: (req, res, next) => {
        const { userId } = req.cookies
        if (!userId) {
            next(new Error('You must be authenticated to access this route'));
        }
        user.rol(userId)
        .then(r => {
            if (r !== 'admin') {
                next(new Error('You must be a admin to access this route'));
            } else {
                next();
            }
        })
    },

    onlyForGuest: (req, res, next) => {
        const { userId } = req.cookies
        if (!userId) {
            next(new Error('You must be authenticated to access this route'));
        }
        user.rol(req.cookies.user)
        .then(r => {
            if (r !== 'guest') {
                next(new Error('You must be a admin to access this route'));
            } else {
                next();
            }
        })
    }
}