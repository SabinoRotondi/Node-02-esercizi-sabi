const session = require('express-session');
const config = require('../../config');
const initSessionMiddleware = (appEnvironment) => {
    const isProduction = appEnvironment === 'production';
    return session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: isProduction,
        },
        proxy: isProduction,
    });
};
module.exports = initSessionMiddleware;