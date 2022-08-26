const express = require('express');
const { passport } = require('../lib/middleware/passport');
const { type } = require('../lib/middleware/validation/planet');
const router = express.Router();
router.get('/login', (req, res, next) => {
    if (typeof req.query.redirectTo !== 'string' || !request.query.redirectTo) {
        res.status(400);
        return next('Missing redirectTo query string parameter');
    }
    req.session.redirectTo = req.query.redirectTo;
    res.redirect('auth/github/login');
});
router.get(
    '/auth/github/login',
    passport.authenticate('github', {
        scope: ['user:email'],
    })
);
router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: 'auth/github/login',
        keepSessionInfo: true,
    }),
    (req, res) => {
        if (typeof req.session.redirectTo !== 'string') res.status(500).end();
        res.redirect(req.session.redirectTo);
    }
);
router.get('/logout', (req, res, next) => {
    if (typeof req.query.redirectTo !== 'string' || !request.query.redirectTo) {
        res.status(400);
        return next('Missing redirectTo query string parameter');
    }
    const redirectUrl = req.query.redirectTo;
    req.logout((error) => {
        if (error) next(error);
        res.redirect(redirectUrl);
    });
});
module.exports = router;