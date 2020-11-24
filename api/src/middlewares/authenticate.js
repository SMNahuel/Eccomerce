const forOwner = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(400).send('You must be authenticated to access this route');
    }
    if (req.user.rolId < 5) {
        return res.status(400).send('You must be a Owner to access this route');
    }
    next();
}

const forAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(400).send('You must be authenticated to access this route');
    }
    if (req.user.rolId < 4) {
        return res.status(400).send('You must be a Admin to access this route');
    }
    next();
}

const forGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(400).send('You must be authenticated to access this route');
    }
    if (req.user.rolId < 3) {
        return res.status(400).send('You must be registered to access this route');
    }
    next();
};

const forAnonym = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(400).send('You must be authenticated to access this route');
    }
    if (req.user.rolId < 2) {
        return res.status(400).send('Your account has been banned contact the company to recover your account');
    }
    next();
};

module.exports = {
    forOwner,
    forAdmin,
    forGuest,
    forAnonym
}