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


function findLinkBetweenCardId(cardId1, cardId2){
    return links.find((l) => (l.id1 === cardId1 && l.id2 === cardId2) || (l.id1 === cardId2 && l.id2 === cardId1));
}

/**
 * Find all links between 2 cards
 * @param {*} cardId1 card id 1
 * @param {*} cardId2 card id 2
 * @returns link
 */
function findPathBetweenCardId(cardId1, cardId2){
    
    const cardsId = shortestPath(cardId1, cardId2);
    const links = [];
    const cards = [];
    for(let i = 1; i < cardsId.length; i++){
        links.push(findLinkBetweenCardId(cardsId[i-1], cardsId[i]));
        if(cardsId[i] != cardId2) cards.push(findCardById(cardsId[i]));
    }
    return {links:links, cards:cards};
}

function shortestPath(source, target) {
    if (source == target) {   // Delete these four lines if
        console.log(source + ' and ' + target + ' are same person');          // you want to look for a cycle
        return [];                 // when the source is equal to
    }                         // the target.
    var queue = [ source ];
    var visited = { source: true };
    var predecessor = {};
    var tail = 0;
    
    while (tail < queue.length) {
        var u = queue[tail++];  // Pop a vertex off the queue.
        var neighbors = findLinksForId(u).map((l) => l.id1 == u ? l.id2 : l.id1);
        for (var i = 0; i < neighbors.length; ++i) {
            var v = neighbors[i];
            if (visited[v]) {
                continue;
            }
            visited[v] = true;
            if (v === target) {   // Check if the path is complete.
                var path = [ v ];   // If so, backtrack through the path.
                while (u !== source) {
                    path.push(u);
                    u = predecessor[u];          
                }
                path.push(u);
                path.reverse();
                console.log('Find path: '+path.join('->'));
                return path;
            }
            predecessor[v] = u;
            queue.push(v);
        }
    }
    console.log('there is no path from ' + source + ' to ' + target);
    return [];
}


function findAllCardPositions(){
    const positions = [];
    for(let c of cards){
        if(c.position !== undefined && !positions.some(pos => c.position.lat == pos.lat && c.position.lon == pos.lon)){
            positions.push(c.position);
        }
        else if(c.positions !== undefined){
            for(p of c.positions){
                if(!positions.some(pos => p.lat == pos.lat && p.lon == pos.lon)) positions.push(p)
            }
        }
    }
    return positions
}

function findCardsByPosition(position){
    return cards.filter((c) => {

        if(c.position !== undefined){
            return c.position.lat == position.lat && c.position.lon == position.lon
        }
        else if(c.positions !== undefined){
            return c.positions.some(pos => position.lat == pos.lat && position.lon == pos.lon)
        }
        return false
    });
}

function findLinksForId(id){
    return links.filter((l) => l.id1 == id || l.id2 == id);
}

function findAllLinkAndCardForAGivenCardId(cardId){
    const links = findLinksForId(cardId);
    const cards = [];
    for(let link of links){
        let currentId = link.id1 == cardId ? link.id2 : link.id1;
        let currentCard = findCardById(currentId);
        cards.push(currentCard);
    }
    return {links:links, cards:cards};
}


module.exports = {
    findAllCard,
    findLinkById,
    findCardById,
    findImagePathByName,
    findAllCardPositions,
    findCardsByPosition,
    findLinksForId,
    findAllLinkAndCardForAGivenCardId,
    findPathBetweenCardId
}