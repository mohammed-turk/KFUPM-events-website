const Event = require('../models/Event');
const cloudinary = require('../utils/cloudinary');

async function fetchEvents() {
    try {
        return await Event.find();
    } catch (err) {
        console.error('Error fetching events:', err);
        throw err;
    }
}

async function fetchEventById(id) {
    try {
        return await Event.findById(id);
    } catch (err) {
        console.error('Error fetching event by ID:', err);
        throw err;
    }
}


async function createEvent(eventData) {
    try {
        console.log("Uploading...");
        const result = await cloudinary.uploader.upload(eventData.posterURL);
        eventData.posterURL = result.secure_url;

        console.log("URL obtained...")
        const event = new Event(eventData);
        await event.save();
        console.log(`${event.title} created!`);
        return event.title;
    } catch(err) {
        console.error('Error creating event:', err);
        throw err;
    }
}

module.exports = { createEvent, fetchEvents, fetchEventById};