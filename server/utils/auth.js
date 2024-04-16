const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models/User');
const { GraphQLError } = require('graphql');

// Generate a JWT token
const signToken = (user) => jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

// Hash a password using bcrypt
const hashPassword = async (password) => await bcrypt.hash(password, 10); // Salt rounds: 10

// Verify JWT token from request headers
const verifyToken = (req) => {
  const token = req.headers.authorization || '';
  if (!token) {
    throw new AuthenticationError('Missing token');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    throw new AuthenticationError('Invalid token');
  }
};

const getUserFromToken = async (token) => {
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);
      return user;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  signToken, hashPassword, verifyToken, getUserFromToken,
};
