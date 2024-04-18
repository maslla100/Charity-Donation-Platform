require('dotenv').config();
console.log(process.env.MONGODB_URI);
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
console.log('Attempting to connect to MongoDB at URI:', uri);

mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected successfully.'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Failed to connect to MongoDB at URI:', uri);
  });

module.exports = mongoose.connection;
