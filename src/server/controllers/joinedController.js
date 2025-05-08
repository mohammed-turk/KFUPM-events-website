const Joined = require('../models/UserFollowClub');

async function getJoinedClubs(userId) {
    try{
        console.log("let's build that joined clubs list...")
        const joinedClubs = (await Joined.getJoinedClubsByUserId(userId)).map(item=>item.clubId);

        console.log("all joined clubs is: ", joinedClubs);
        return joinedClubs;
    }catch(err){
        console.error(`Error getting ${userId} favorite events: ${err}`);
    }
}

async function joinClub(userID, clubId) {
    try {
        const alreadyJoined = await Joined.findOne({ user: userID, club: clubId });
        if (alreadyJoined) {
            throw new Error("User already follows this club.");
        }

        const joined = new Joined({ user: userID, club: clubId });
        const result = await joined.save();
        return result;
    } catch (err) {
        console.error('Error following club:', err);
        throw err;
    }
}



module.exports = {getJoinedClubs, joinClub};