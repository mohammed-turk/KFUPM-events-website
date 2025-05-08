const mongoose = require('mongoose');
const UserFavEventSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    }
}, {collection: 'UserFavEvent'});


UserFavEventSchema.statics.getAllEvents = async function () {
    return await this.find();
};

UserFavEventSchema.statics.getFavEventsByUser = async function (userId) {
    return await this.find({userId: userId}).populate("eventId");
};

const FavEvent = mongoose.model('FavEvent', UserFavEventSchema);
module.exports = FavEvent;