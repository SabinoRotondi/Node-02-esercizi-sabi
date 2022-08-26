const passport = require('passport');
const passportGitHub2 = require('passport-github2');
const config = require('../../config');
const { RequestHandler } = require('express');
const githubStrategy = new passportGitHub2.Strategy(
    {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
        const user = { username: profile.username };
        done(null, user);
    }
);
passport.use(githubStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
const checkAuthorization = (req, res, next) => {
    if (req.isAuthenticated()) next();
    res.status(401).end();
};
module.exports = { passport, checkAuthorization };