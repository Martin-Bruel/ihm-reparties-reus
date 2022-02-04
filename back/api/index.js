const { Router } = require('express');
const router = new Router();
const cards = require('../mocks/cards.json');
const path = require('path');
const fs = require('fs');

/* return all cards */
router.get('/cards', (req, res) => {
    res.send(cards);
});

/* return card with the specific id */
router.get('/card/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const card = cards.find((c) => c.id === id);

    if(card === undefined) res.sendStatus(404);
    else res.send(card);
});

/* return image with the specific name */
router.get('/image/:name', (req, res) => {

    const file = path.resolve(`${__dirname}/../mocks/images/${req.params.name}`);
    if (fs.existsSync(file)) res.sendFile(file);
    else res.sendStatus(404);
});

module.exports = router;