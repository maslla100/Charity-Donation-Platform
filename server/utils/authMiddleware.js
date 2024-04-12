
const { verifyToken } = require('./auth');
const { AuthenticationError } = require('apollo-server-express');

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
