const express = require('express');
const app = express();
const prisma = require('../lib/prisma/client');
app.get('/planets', async (req, res) => {
    const planets = await prisma.planet.findMany();
    res.json(planets);
});
module.exports = app;