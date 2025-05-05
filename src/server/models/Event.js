const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    date: { type: String, required: true },
    posterURL: { type: String, required: true },
    provider: {type: String,required: true},
    timing: { type: String, required: true },
    title : { type: String, required: true },
}, { collection: "Event" });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;