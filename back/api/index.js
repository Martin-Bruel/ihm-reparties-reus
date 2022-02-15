const { Router } = require('express');
const router = new Router();
const Controller = require('../controller');
const Websocket = require('../websocket')

/**
 * Return all cards
 */
router.get('/cards', (req, res) => {
    const cards = Controller.findAllCard();
    console.log('Get all cards')
    res.send(cards);
});

/**
 * Return card with the specific id
 */
router.get('/card/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const card = Controller.findCardById(id);
    console.log('Get card: ' + id)

    if(card === undefined) res.sendStatus(404);
    else res.send(card);
});

/**
 * Return image with the specific name
 */
router.get('/image/:name', (req, res) => {

    const imageName = req.params.name
    const path = Controller.findImagePathByName(imageName);
    console.log('Get iamge: ' + imageName)

    if (path === undefined)  res.sendStatus(404);
    else res.sendFile(path);
});

/**
 * Find path between two card
 * Return all card and link between 2 card
 * If no path exist return an empty array
 */
router.get('/path/:id1/:id2', (req, res) => {

    const id1 = parseInt(req.params.id1)
    const id2 = parseInt(req.params.id2)
    const json = Controller.findPathBetweenCardId(id1, id2);
    console.log('Get path between: ' + id1 + ' and ' + id1)
    res.send(json);
})

/**
 * Return all position find
 */
router.get('/positions', (req, res) => {

    const positions = Controller.findAllCardPositions();
    console.log('Get all positons')
    res.send(positions);
})

/**
 * Return cards for a given position
 */
router.post('/cards/position', (req, res) => {

    const position = {lat:req.body.lat, lon:req.body.lon};
    const cards = Controller.findCardsByPosition(position);
    console.log('Get all cards for position: ' + position.lat + ":" +position.lon)
    res.send(cards);
})

/**
 * Return all cards and id directly linked to the given card id
 */
router.get('/cards/links/:id', (req, res) => {
    
    const cardId = parseInt(req.params.id);
    const json = Controller.findAllLinkAndCardForAGivenCardId(cardId)
    console.log('Get all linked cards to :' + cardId)
    res.send(json);
})


/**
 * Send position to table
 */
router.post('/table/position/:id', (req, res) => {

    const position = req.body;
    const screenId = req.params.id;

    console.log(`Send position to screen ${screenId}: ${position.lat}:${position.lon}`)
    Websocket.sendMessageToTable(screenId, position);
    res.sendStatus(200);
})

module.exports = router;