const { Schema, model } = require('mongoose');

const donationSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  charity: {
    type: Schema.Types.ObjectId,
    ref: 'Charity',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Add any other fields as necessary
});

const Donation = model('Donation', donationSchema);

module.exports = Donation;
