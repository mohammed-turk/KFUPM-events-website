const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dxvl17oal',
    api_key: '575748793783843',
    api_secret: 'DaOL3tOBVnXk0Dhcg5vB9xbW2jc'
});

module.exports = cloudinary;