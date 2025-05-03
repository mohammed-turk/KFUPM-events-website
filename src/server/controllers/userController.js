// controllers/userController.js
const User = require('../models/User');

async function fetchUsers() {
    try {
        return await User.find();
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
}

async function createUser(userData) {
    try {
        const user = new User(userData);
        await user.save();
        console.log(`${user.username} created!`);
        return user.username; // Return the created user, not all users
    } catch(err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

module.exports = { createUser, fetchUsers };