const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: { type: String, required: true },
    posterURL: { type: String, required: true },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    timing: { type: String, required: true },
    title: { type: String, required: true },
}, {collection: 'Event'});


eventSchema.statics.getAllEvents = async function () {
    return await this.find();
};

eventSchema.statics.getEventById = async function (eventId) {
    return await this.findById(eventId);
};

eventSchema.statics.getEventDate = async function (eventId) {
    const event = await this.findById(eventId, 'date');
    return event ? event.date : null;
};

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;