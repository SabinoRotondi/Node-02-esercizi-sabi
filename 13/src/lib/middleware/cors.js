const cors = require('cors');
const initCorsMiddleware = () => {
  const corsOption = {
    origin: 'http://localhost:3000',
    credential: true,
  };
  return cors(corsOption);
};
module.exports = initCorsMiddleware;