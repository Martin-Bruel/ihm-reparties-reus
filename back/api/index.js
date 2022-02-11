const { Router } = require('express');
const router = new Router();
const Controller = require('../controller');
const Websocket = require('../websocket')

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

router.get('/positions'), (req, res) => {

    const positions = Controller.findAllCardPositions();
    res.send(positions);
}

router.get('/cards/position/longitude/:lon/lattitude/:lat', (req, res) => {

    //const cards = Controller.
})

router.post('/table/position/:id', (req, res) => {

    const position = req.body;
    const screenId = req.params.id;

    console.log(`Message receive from screen ${screenId} : ${position.lat}:${position.lon}`)
    Websocket.sendMessageToTable(screenId, position);
    res.sendStatus(200);
})

module.exports = router;