const Club = require('../models/Club');
const cloudinary = require('../utils/cloudinary');
const {createUser} = require("./userController");

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
        createUser({"name":club.name, "username":club.name, "email":club.email, "password":club.password, "usertype":1});
        console.log(`${club.name} was added to users list!`)
        return club.name;
    } catch(err) {
        console.error('Error creating club:', err);
        throw err;
    }
}

module.exports = { createClub, fetchClubs };