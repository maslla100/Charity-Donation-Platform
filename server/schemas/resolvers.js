const bcrypt = require('bcryptjs');
const { ApolloError, UserInputError, AuthenticationError } = require('apollo-server-errors');
const { User, Charity, Donation } = require('../models');
const { signToken } = require('../utils/auth');

// Centralized error handler
const handleError = (error, message) => {
  console.error(message, error);
  throw new ApolloError(`${message}: ${error.message}`);
};

const resolvers = {
  Query: {
    charities: async () => {
      try {
        const allCharities = await Charity.find({});
        console.log('Charities found:', allCharities);
        return allCharities;
      } catch (error) {
        return handleError(error, 'Error fetching charities');
      }
    },

    charity: async (_, { id }) => {
      console.log('Fetching charity by ID:', id);
      try {
        const charity = await Charity.findById(id);
        if (!charity) {
          console.log('No charity found with ID:', id);
          return null;
        }
        console.log('Charity found:', charity);
        return charity.toObject({ getters: true });
      } catch (error) {
        return handleError(error, 'Error fetching charity by ID');
      }
    },

    donations: async () => {
      try {
        const donations = await Donation.find().populate('charity user');
        console.log('Donations found:', donations);
        return donations;
      } catch (error) {
        return handleError(error, 'Error fetching donations');
      }
    },

    donationsByUser: async (_, { userId }) => {
      try {
        const donations = await Donation.find({ user: userId }).populate('charity user');
        console.log('Donations by user found:', donations);
        return donations;
      } catch (error) {
        return handleError(error, 'Error fetching donations by user');
      }
    },

    users: async () => {
      try {
        const users = await User.find({});
        console.log('Users found:', users);
        return users;
      } catch (error) {
        return handleError(error, 'Error fetching users');
      }
    },
  },
  Mutation: {
    addCharity: async (_, args) => {
      try {
        const newCharity = await Charity.create(args);
        console.log('New charity added:', newCharity);
        return newCharity;
      } catch (error) {
        return handleError(error, 'Error adding new charity');
      }
    },

    addDonation: async (_, { charityId, userId, amount }) => {
      try {
        const donation = await Donation.create({ charity: charityId, user: userId, amount });
        await User.findByIdAndUpdate(userId, { $push: { donations: donation._id } });
        console.log('New donation added:', donation);
        return donation;
      } catch (error) {
        return handleError(error, 'Error adding donation');
      }
    },

    signupUser: async (_, {
      name, email, password, address,
    }) => {
      const saltRounds = 10;
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          address,
        });
        await newUser.save();
        console.log('New user signed up:', newUser);
        return newUser;
      } catch (error) {
        return handleError(error, 'Failed to sign up user');
      }
    },

    signIn: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !(await user.validatePassword(password))) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);
        console.log('User signed in:', user);
        return { token, user };
      } catch (error) {
        return handleError(error, 'Error signing in user');
      }
    },
  },
};

module.exports = resolvers;
