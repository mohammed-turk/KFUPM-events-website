const mongoose = require('mongoose');

const userFollowClubSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
}, {collection: 'UserFollowClub'});


userFollowClubSchema.statics.getUsersByClubId = async function (clubId) {
    const users = await this.find({ club: clubId }).populate('user');
    return users.map(follow => follow.user);
};

userFollowClubSchema.statics.getJoinedClubsByUserId = async function (userId) {
    return await this.find({ userId: userId }).populate('clubId');
};

const UserFollowClub = mongoose.model('UserFollowClub', userFollowClubSchema);
module.exports = UserFollowClub;
