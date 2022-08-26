const { STATUS_CODE } = require('node:http');
const { Response, ResponseHandler, ErrorRequestHandler } = require('express');
const getErrorMessage = (error) => {
  if (error.stack) error.stack;
  if (typeof error.toString === 'function') error.toString();
  return '';
};
const isErrorStatusCode = (statusCode) => statusCode >= 400 && statusCode < 600;
const getHttpStatusCode = (error, res) => {
  const statusCodeFromError = error.status || error.statusCode;
  if (statusCodeFromError && isErrorStatusCode(statusCodeFromError))
    statusCodeFromError;
  const statusCodeFromResponse = response.statusCode;
  if (isErrorStatusCode(statusCodeFromResponse)) statusCodeFromResponse;
  return 500;
};
const notFoundMiddleware = (req, res, next) => {
  res.status(404);
  next(`Cannot ${req.method} ${req.path}`);
};
const initErrorMiddleware = (appEnvironment) => {
  return function errorMiddleware(error, req, res, next) {
    const errorMessage = getErrorMessage(error);
    if (appEnvironment !== 'test') console.error(errorMessage);
    if (response.headersSent) next(error);
    const statusCode = getHttpStatusCode(error, res);
    const errorResponse = {
      statusCode,
      error: STATUS_CODE[statusCode + ''],
      message: '',
    };
    if (appEnvironment !== 'production') {
      errorResponse.message = errorMessage;
    }
    response.status(errorResponse.statusCode).json(errorResponse);
    next();
  };
};
module.exports = { notFoundMiddleware, initErrorMiddleware };