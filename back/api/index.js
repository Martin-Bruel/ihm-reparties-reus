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
 * Find path between two card
 * Return all card and link between 2 card
 * If no path exist return an empty array
 */
router.get('/path/:id1/:id2', (req, res) => {

    const json = Controller.findPathBetweenCardId(parseInt(req.params.id1), parseInt(req.params.id2));
    res.send(json);
})

/**
 * Return all position find
 */
router.get('/positions'), (req, res) => {

    const positions = Controller.findAllCardPositions();
    res.send(positions);
}

/**
 * Return cards for a given position
 */
router.get('/cards/position/longitude/:lon/lattitude/:lat', (req, res) => {

    const position = {lat:parseInt(req.params.lat), lon:parseInt(req.params.lon)};
    const cards = Controller.findCardsByPosition(position);
    res.send(cards);
})

/**
 * Return all cards and id directly linked to the given card id
 */
router.get('/cards/links/:id', (req, res) => {
    
    const cardId = parseInt(req.params.id);
    const json = Controller.findAllLinkAndCardForAGivenCardId(cardId)
    res.send(json);
})


/**
 * Send position to table
 */
router.post('/table/position/:id', (req, res) => {

    const position = req.body;
    const screenId = req.params.id;

    console.log(`Message receive from screen ${screenId} : ${position.lat}:${position.lon}`)
    Websocket.sendMessageToTable(screenId, position);
    res.sendStatus(200);
})

module.exports = router;