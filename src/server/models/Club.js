const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    iconURL: { type: String, required: true },
});

clubSchema.statics.getAllClubs = async () => {
        return await this.find();
};

clubSchema.statics.getClubById = async (clubId) => {
        return await this.findById(clubId);
};


const Club = mongoose.model('Club', clubSchema);
module.exports = Club;