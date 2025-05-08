const mongoose = require('mongoose');

const userFollowClubSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
}, {collection: 'UserFollowClub'});

userFollowClubSchema.statics.getAll = async function(){
    return await this.find();
}

userFollowClubSchema.statics.getUsersByClubId = async function (clubId) {
    const users = await this.find({ club: clubId }).populate('user');
    return users.map(follow => follow.user);
};

userFollowClubSchema.statics.getJoinedClubsByUserId = async function (userId) {
    return await this.find({ userId: userId }).populate('clubId');
};

const UserFollowClub = mongoose.model('UserFollowClub', userFollowClubSchema);
module.exports = UserFollowClub;
