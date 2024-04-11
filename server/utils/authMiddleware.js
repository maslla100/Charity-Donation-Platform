// ./Charity-Donation-Platform/server/utils/authMiddleware.js

const { verifyToken } = require('./auth');
const { AuthenticationError } = require('apollo-server-express');

// Middleware to protect routes that require authentication
const authMiddleware = (req, res, next) => {
    try {
        const user = verifyToken(req);
        req.user = user;
        next();
    } catch (err) {
        throw new AuthenticationError('Not authenticated');
    }
};

module.exports = authMiddleware;
