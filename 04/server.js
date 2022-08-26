require('dotenv').config();
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.json({ msg: 'Hello' });
});
app.listen(process.env.PORT, () => console.log('server running'));
module.exports = app;