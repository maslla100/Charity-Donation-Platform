const mongoose = require('mongoose');
const { Schema } = mongoose;

const charitySchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true, lowercase: true },
  description: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  telephone: { type: String, required: true, trim: true },
  logo: { type: String, required: true, trim: true },
  address: {
    number: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true }
  },
  ein: { type: String, required: true, trim: true },
  missionStatement: { type: String, required: true, trim: true },
  website: { type: String, required: true, trim: true },
  rating: { type: String, required: false },
  image: { type: String, required: false },
  donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity;
