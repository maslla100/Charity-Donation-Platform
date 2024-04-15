const mongoose = require('mongoose');
const { Schema } = mongoose;


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
}, {
  timestamps: true
});


const Donation = mongoose.model('Donation', donationSchema);


module.exports = Donation;
