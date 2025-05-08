const FavEvent = require('../models/UserFavEvent');

async function getFavEvents(userId) {
    try{
        return (await FavEvent.getFavEventsByUser(userId)).map(item=>item.eventId);
    }catch(err){
        console.error(`Error getting ${userId} favorite events: ${err}`);
    }
}

module.exports = {getFavEvents};