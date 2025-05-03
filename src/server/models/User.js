const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype: { type: Number, required: true, default: 2},//to know if the user is admin(0), org(1) or normal user(2)
}, {collection: 'User'});

userSchema.statics.getAllUsers = async function () {
    return await this.find();
};

userSchema.statics.getPasswordByUsername = async function (username) {
    const user = await this.findOne({ name: username }, 'password');
    return user ? user.password : null;
};

userSchema.statics.getEmailByUsername = async function (username) {
    const user = await this.findOne({ name: username }, 'email');
    return user ? user.email : null;
};

userSchema.statics.getRoleByUsername = async function (username) {
    const user = await this.findOne({ name: username }, 'role');
    return user ? user.role : null;
};

userSchema.statics.getNameById = async function (userId) {
    const user = await this.findById(userId, 'name');
    return user ? user.name : null;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
