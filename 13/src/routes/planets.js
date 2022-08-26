const express = require('express');
const prisma = require('../lib/prisma/client');
const { validate } = require('../lib/middleware/validation/index');
const { checkAuthorization } = require('../lib/middleware/passport');
const planetSchema = require('../lib/middleware/validation/planet');
const { initMulterMiddleware } = require('../lib/middleware/multer');
const upload = initMulterMiddleware();
const router = express.Router();
router.get('/', async (req, res) => {
    const planets = await prisma.planet.findMany();
    res.json(planets);
});
router.get('/:id(\\d+)', async (req, res, next) => {
    const planetId = Number(req.params.id);
    const planet = await prisma.planet.findUnique({
        where: { id: planetId },
        });
    if (!planet) {
        res.status(404);
        return next(`Cannot GET /planet/${planetId}`);
    }
    res.json(planet);
});
router.post(
    '/',
    checkAuthorization,
    validate({ body: planetSchema }),
    async (req, res) => {
        const planetData = req.body;
        const username = req.user?.username;
        const planet = await prisma.planet.create({
            data: { ...planetData, createdBy: username, updatedBy: username },
        });
        res.status(201).json(planet);
    }
);
router.put(
    '/:id(\\d+)',
    checkAuthorization,
    validate({ body: planetSchema }),
    async (req, res, next) => {
        const planetData = req.body;
        const planetId = Number(req.params.id);
        const username = req.user?.username;
        try {
            const planet = await prisma.planet.update({
                where: { id: planetId },
                data: { ...planetData, updatedBy: username },
            });
            res.status(200).json(planet);
        } catch (err) {
            res.status(404);
            next(`Cannot PUT /planets/${planetId}`);
        }
    }
);
router.delete('/:id(\\d+)', checkAuthorization, async (req, res, next) => {
    const planetId = Number(req.params.id);
    try {
        await prisma.planet.delete({
            where: { id: planetId },
        });
        res.status(204).end();
    } catch (err) {
        res.status(404);
        next(`Cannot DELETE /planets/${planetId}`);
    }
});
router.post(
    '/:id(\\d+)/photo',
    checkAuthorization,
    upload.single('photo'),
    async (req, res, next) => {
        if (!req.file) {
            res.status(400);
            return next('No photo file uploaded');
        }
        const planetId = Number(req.params.id);
        const photoFilename = req.file.filename;
        try {
            await prisma.planet.update({
                where: { id: planetId },
                data: { photoFilename },
            });
            res.status(201).json({ photoFilename });
        } catch (err) {
            res.status(404);
            next(`Cannot POST /planets/${planetId}/photo`);
        }
    }
);
router.use('/photos', express.static('uploads'));
module.exports = router;