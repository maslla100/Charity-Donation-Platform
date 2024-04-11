// ./server/config/connection.js
const mongoose = require('mongoose');
require('dotenv').config();  // Ensures your environment variables are loaded

const uri = process.env.MONGODB_URI;

const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

module.exports = db;
