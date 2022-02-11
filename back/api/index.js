const { Router } = require('express');
const router = new Router();
const Controller = require('../controller');

/**
 * Return all cards
 */
router.get('/cards', (req, res) => {
    const cards = Controller.findAllCard();
    res.send(cards);
});

/**
 * Return card with the specific id
 */
router.get('/card/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const card = Controller.findCardById(id);

    if(card === undefined) res.sendStatus(404);
    else res.send(card);
});

/**
 * Return image with the specific name
 */
router.get('/image/:name', (req, res) => {

    const imageName = req.params.name
    const path = Controller.findImagePathByName(imageName);

    if (path === undefined)  res.sendStatus(404);
    else res.sendFile(path);
});

/**
 * Return link between 2 card
 */
router.get('/link/:id1/:id2', (req, res) => {

    const link = Controller.findLinkBetweenCardId(parseInt(req.params.id1), parseInt(req.params.id2));
    if(link === undefined) res.sendStatus(404);
    else res.send(link);
})

module.exports = router;