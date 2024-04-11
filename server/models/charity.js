const { Schema, model } = require('mongoose');

const charitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    telephone: String,
    address: String,
    ein: String,
    website: String,
    image: String,
    mission: String,
    rating: String,
    // Include any other relevant fields
});

const Charity = model('Charity', charitySchema);

module.exports = Charity;
