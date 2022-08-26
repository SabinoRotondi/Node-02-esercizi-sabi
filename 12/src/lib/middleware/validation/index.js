const addFormats = require('ajv-formats');
const {
  Validator,
  ValidationError,
} = require('express-json-validator-middleware');
const validator = new Validator({});
addFormats(validator.ajv, ['date.time'])
  .addKeyword('kind')
  .addKeyword('modifier');
const validate = validator.validate;
const validationErrorMiddleware = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(422).send({ errors: error.validationErrors });
    next();
  } else {
    next(error);
  }
};
module.exports = { validate, validationErrorMiddleware };