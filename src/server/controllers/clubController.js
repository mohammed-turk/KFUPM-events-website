const Club = require('../models/Club');
const cloudinary = require('../utils/cloudinary');

async function fetchClubs() {
    try {
        return await Club.find();
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
}

async function createClub(clubData) {
    try {
        const result = await cloudinary.uploader.upload(clubData.icon);
        clubData.iconURL = result.secure_url;
        const club = new Club(clubData);
        await club.save();
        console.log(`${club.name} created!`);
        return club.name;
    } catch(err) {
        console.error('Error creating club:', err);
        throw err;
    }
}

module.exports = { createClub, fetchClubs };