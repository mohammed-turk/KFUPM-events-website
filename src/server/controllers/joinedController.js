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

module.exports = {getJoinedClubs};