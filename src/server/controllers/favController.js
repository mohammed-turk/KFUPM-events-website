const FavEvent = require('../models/UserFavEvent');
const FavClub = require('../models/UserFollowClub');

async function getFavClubs(userId) {
    try {
        return (await FavClub.getFavClubsByUser(userId)).map(item => item.clubId);
    } catch (err) {
        console.error(`Error getting ${userId} favorite clubs: ${err}`);
    }
}

async function createUserFavClub({ userID, clubID }) {
    try {
        const newFav = new FavClub({
            userId: userID,
            clubId: clubID
        });

        const savedFav = await newFav.save();
        return savedFav;
    } catch (err) {
        console.error(`Error creating favorite club: ${err}`);
        throw err;
    }
}


async function getFavEvents(userId) {
    try{
        return (await FavEvent.getFavEventsByUser(userId)).map(item=>item.eventId);
    }catch(err){
        console.error(`Error getting ${userId} favorite events: ${err}`);
    }
}

module.exports = { getFavClubs, createUserFavClub, getFavEvents};