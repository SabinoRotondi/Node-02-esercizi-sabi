const express = require('express');
const app = express();
const initCorsMiddleware = require('./lib/middleware/cors');
const planetsRoutes = require('./routes/planets');
const validationErrorMiddleware =
  require('./lib/middleware/validation/index').validationErrorMiddleware;
const initSessionMiddleware = require('./lib/middleware/session');
const { passport } = require('./lib/middleware/passport');
const authRoutes = require('./routes/auth');
const {
  notFoundMiddleware,
  initErrorMiddleware,
} = require('./lib/middleware/error');
app.use(initSessionMiddleware(app.get('env')));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(initCorsMiddleware());
app.use('/planets', planetsRoutes);
app.use('/auth', authRoutes);
app.use(notFoundMiddleware);
app.use(validationErrorMiddleware);
app.use(initErrorMiddleware(app.get('env')));
module.exports = app;