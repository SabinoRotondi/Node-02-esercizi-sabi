const express = require('express');
const app = express();
const prisma = require('../lib/prisma/client');
const {
    validate,
    validationErrorMiddleware,
} = require('../lib/validation/index');
const planetSchema = require('../lib/validation/planet');
app.use(express.json());
app.get('/planets', async (req, res) => {
    const planets = await prisma.planet.findMany();
    res.json(planets);
});
app.post('/planets', validate({ body: planetSchema }), async (req, res) => {
    const planetData = req.body;
    const planet = await prisma.planet.create({
        data: planetData,
    });
    res.status(201).json(planet);
});
app.use(validationErrorMiddleware);
module.exports = app;