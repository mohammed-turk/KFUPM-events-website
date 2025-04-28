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
});


userFollowClubSchema.statics.getUsersByClubId = async function (clubId) {
    const users = await this.find({ club: clubId }).populate('user', 'name email');
    return users.map(follow => follow.user);
};

userFollowClubSchema.statics.getClubsByUserId = async function (userId) {
    const clubs = await this.find({ user: userId }).populate('club', 'name description');
    return clubs.map(follow => follow.club);
};

const UserFollowClub = mongoose.model('UserFollowClub', userFollowClubSchema);
module.exports = UserFollowClub;
