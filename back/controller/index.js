const path = require('path');
const fs = require('fs');
const cards = require('../mocks/cards.json');
const links = require('../mocks/links.json');

/**
 * Find all cards
 * @returns cards
 */
function findAllCard(){
    return cards;
}

/**
 * Find card by id
 * @param {*} id card id
 * @returns card
 */
function findCardById(id){
    return cards.find((c) => c.id === id);
}





/**
 * Find image path by name
 * if image do not exist: return undifined
 * @param {*} filename image name
 * @returns image path
 */
function findImagePathByName(filename){
    const imagePath = path.resolve(`${__dirname}/../mocks/images/${filename}`);
    if (fs.existsSync(imagePath)) return imagePath;
    return undefined;
}





/**
 * Find link by id
 * @param {*} id link id
 * @returns link
 */
function findLinkById(id){
    return links.find((l) => l.id === id);
}

/**
 * Find link between 2 cards
 * @param {*} cardId1 card id 1
 * @param {*} cardId2 card id 2
 * @returns link
 */
function findLinkBetweenCardId(cardId1, cardId2){
    return links.find((l) => (l.id1 === cardId1 && l.id2 === cardId2) || (l.id1 === cardId2 && l.id2 === cardId1));
}

//TODO implement call
function findAllLinkedCard(cardId){

}


function findAllCardPositions(){
    return cards.map((c) => c.positions);
}

function findCardsByPosition(position){
    return cards.find((c) => c.positions == position);
}

module.exports = {
    findAllCard,
    findLinkById,
    findCardById,
    findLinkBetweenCardId,
    findAllLinkedCard,
    findImagePathByName,
    findAllCardPositions,
    findCardsByPosition
}