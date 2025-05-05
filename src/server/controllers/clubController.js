const Club = require('../models/Club');
const cloudinary = require('../utils/cloudinary');

// Fetch all clubs
const fetchClubs = async (req, res) => {
    try {
        const clubs = await Club.find({}, "name icon"); // return only what's needed
        res.json(clubs);
    } catch (err) {
        console.error("Error fetching clubs:", err);
        res.status(500).json({ error: "Failed to fetch clubs" });
    }
};

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