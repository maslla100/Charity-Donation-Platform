const bcrypt = require('bcryptjs');
const { User, Charity, Donation, Feedback } = require('../models');
const { signToken } = require('../utils/auth');
const { ApolloError } = require('apollo-server-express');
const { AuthenticationError } = require('apollo-server-express');



const handleError = (error, message) => {
  console.error(message, error);
  throw new ApolloError(`${message}: ${error.message}`, { invalidArgs: Object.keys(error.keyValue) });
};

const resolvers = {
  Query: {
    charities: async () => {
      try {
        const allCharities = await Charity.find({});
        return allCharities;
      } catch (error) {
        return handleError(error, 'Error fetching charities');
      }
    },

    charity: async (_, { id }) => {
      try {
        const charity = await Charity.findById(id);
        if (!charity) {
          throw new ApolloError('No charity found with ID: ' + id, 'NOT_FOUND');
        }
        return charity;
      } catch (error) {
        return handleError(error, 'Error fetching charity by ID');
      }
    },

    donations: async () => {
      try {
        const donations = await Donation.find().populate('charity user');
        return donations;
      } catch (error) {
        return handleError(error, 'Error fetching donations');
      }
    },

    donationsByUser: async (_, { userId }) => {
      try {
        const donations = await Donation.find({ user: userId }).populate('charity user');
        return donations;
      } catch (error) {
        return handleError(error, 'Error fetching donations by user');
      }
    },

    users: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        return handleError(error, 'Error fetching users');
      }
    },
    getUserDonations: async (_, { userId }, { Donation }) => {
      try {
        const donations = await Donation.find({ user: userId }).populate('charity');
        return donations;
      } catch (error) {
        throw new Error('Error fetching donations for user: ' + error.message);
      }
    },
  },

  Mutation: {
    sendFeedback: async (_, { input }) => {
      try {
        const newFeedback = new Feedback({
          name: input.name,
          email: input.email,
          message: input.message
        });
        await newFeedback.save();
        return {
          _id: newFeedback._id,
          name: newFeedback.name,
          email: newFeedback.email,
          success: true,
          message: "Thank you for your feedback!",
          feedback: newFeedback
        };
      } catch (error) {
        console.error("Error saving feedback:", error);
        return {
          success: false,
          message: "An error occurred while submitting your feedback. Please try again."
        };
      }
    },

    addCharity: async (_, args) => {
      try {
        const newCharity = await Charity.create(args);
        return newCharity;
      } catch (error) {
        return handleError(error, 'Error adding new charity');
      }
    },

    addDonation: async (_, { charityId, userId, amount }) => {
      try {
        const donation = await Donation.create({ charity: charityId, user: userId, amount });
        await User.findByIdAndUpdate(userId, { $push: { donations: donation._id } });
        return donation;
      } catch (error) {
        return handleError(error, 'Error adding donation');
      }
    },

    signupUser: async (_, { firstName, lastName, email, password, number, street, city, state, zipCode }) => {
      const saltRounds = 10;
      try {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          address: { number, street, city, state, zipCode }
        });
        await newUser.save();
        return newUser;
      } catch (error) {
        return handleError(error, 'Failed to sign up user');
      }
    },



    signIn: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('SignIn error:', error);
        throw new ApolloError('Error signing in user', { error: error.message });
      }
    },

  },

  User: {
    name: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
  },

};



module.exports = { resolvers };
