const session = require('express-session');
const config = require('../../config');
const initSessionMiddleware = () => {
    return session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    });
};
module.exports = initSessionMiddleware;