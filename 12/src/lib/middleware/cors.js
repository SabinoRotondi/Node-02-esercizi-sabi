const cors = require('cors');
const initCorsMiddleware = () => {
    const corsOption = {
        origin: 'http://localhost:3000',
    };
    return cors(corsOption);
};
module.exports = initCorsMiddleware;