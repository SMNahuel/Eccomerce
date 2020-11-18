const user = require('../controllers/user');

module.exports = {
    forOwner: (req, res, next) => {
        const { userId } = req.cookies
        if (!userId) {
            return res.status(400).send('You must be authenticated to access this route');
        }
        user.rol(userId)
        .then(r => {
            if (r < 4) {
                return res.status(400).send('You must be a Owner to access this route');
            } else {
                next();
            }
        })
    },

    forAdmin: (req, res, next) => {
        const { userId } = req.cookies
        if (!userId) {
            return res.status(400).send('You must be authenticated to access this route');
        }
        user.rol(userId)
        .then(r => {
            if (r < 3) {
                return res.status(400).send('You must be a Owner to access this route');
            } else {
                next();
            }
        })
    },

    forGuest: (req, res, next) => {
        const { userId } = req.cookies
        if (!userId) {
            return res.status(400).send('You must be authenticated to access this route');
        }
        user.rol(userId)
        .then(r => {
            if (r < 2) {
                return res.status(400).send('You must be a Owner to access this route');
            } else {
                next();
            }
        })
    }
}