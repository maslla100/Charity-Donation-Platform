const bcrypt = require('bcryptjs');
const { User, Charity, Donation } = require('../models');
const { signToken, AuthenticationError, ApolloError } = require('../utils/auth');

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
  },
  Mutation: {
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
      const saltRounds = 12;
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
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
        console.log(`Looking for user with email: ${email}`);
        const user = await User.findOne({ email });
        if (!user) {
          console.log(`No user found with email: ${email}`);
          throw new AuthenticationError('Incorrect credentials');
        }
        console.log(`User found: ${user.email}, validating password...`);
        const valid = await user.isCorrectPassword(password);
        if (!valid) {
          console.log(`Password validation failed for user: ${email}`);
          throw new AuthenticationError('Incorrect credentials');
        }
        console.log(`Password validated, generating token...`);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('SignIn error:', error);
        throw new ApolloError('Error signing in user');
      }
    },


  },
};



module.exports = { resolvers };
