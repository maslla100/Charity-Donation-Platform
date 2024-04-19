require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected successfully.'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Failed to connect to MongoDB at URI:', uri);
  });

module.exports = mongoose.connection;
