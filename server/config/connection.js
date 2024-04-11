const mongoose = require('mongoose');

// Log the URI to check it is correct
console.log('Attempting to connect to MongoDB at URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {

}).catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected');
});

module.exports = db;
