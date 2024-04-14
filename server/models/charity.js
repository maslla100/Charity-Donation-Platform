const { ObjectId } = require('mongodb');

const { Schema } = ('mongoose');
const mongoose = require('mongoose');

const charitySchema = new mongoose.Schema({
  _id: ObjectId,
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

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity;
