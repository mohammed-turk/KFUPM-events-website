const Club = require('../models/Event');
const cloudinary = require('../utils/cloudinary');

async function fetchEvents() {
    try {
        return await Event.find();
    } catch (err) {
        console.error('Error fetching events:', err);
        throw err;
    }
}

async function createEvent(eventData) {
    try {
        const result = await cloudinary.uploader.upload(eventData.poster);
        eventData.poster = result.secure_url;
        const event = new Club(eventData);
        await event.save();
        console.log(`${event.title} created!`);
        return event.name;
    } catch(err) {
        console.error('Error creating event:', err);
        throw err;
    }
}

module.exports = { createEvent, fetchEvents};