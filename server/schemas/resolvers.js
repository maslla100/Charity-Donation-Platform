const bcrypt = require('bcryptjs');
const { User, Charity, Donation } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const handleError = (error, message) => {
  console.error(message, error);
  throw new ApolloError(`${message}: ${error.message}`);
};

const resolvers = {
  Query: {
    charities: async () => {
      console.log('Attempting to fetch all charities');
      try {
        const allCharities = await Charity.find({});
        console.log('Charities found:', allCharities);
        return allCharities;
      } catch (error) {
        console.log('Failed to fetch charities');
        return handleError(error, 'Error fetching charities');
      }
    },

    charity: async (_, { id }) => {
      console.log('Attempting to fetch charity by ID:', id);
      try {
        const charity = await Charity.findById(id);
        if (!charity) {
          console.log('No charity found with ID:', id);
          return null;
        }
        console.log('Charity found:', charity);
        return charity.toObject({ getters: true });
      } catch (error) {
        console.log('Failed to fetch charity by ID:', id);
        return handleError(error, 'Error fetching charity by ID');
      }
    },

    donations: async () => {
      console.log('Attempting to fetch all donations');
      try {
        const donations = await Donation.find().populate('charity user');
        console.log('Donations found:', donations);
        return donations;
      } catch (error) {
        console.log('Failed to fetch donations');
        return handleError(error, 'Error fetching donations');
      }
    },

    donationsByUser: async (_, { userId }) => {
      console.log('Attempting to fetch donations by user ID:', userId);
      try {
        const donations = await Donation.find({ user: userId }).populate('charity user');
        console.log('Donations by user found:', donations);
        return donations;
      } catch (error) {
        console.log('Failed to fetch donations by user ID:', userId);
        return handleError(error, 'Error fetching donations by user');
      }
    },

    users: async () => {
      console.log('Attempting to fetch all users');
      try {
        const users = await User.find({});
        console.log('Users found:', users);
        return users;
      } catch (error) {
        console.log('Failed to fetch users');
        return handleError(error, 'Error fetching users');
      }
    },
  },
  Mutation: {
    addCharity: async (_, { name, description, email, telephone, logo, number, street, city, state, zipCode, ein, missionStatement, website, rating }) => {
      console.log('Attempting to add new charity with details:', name);
      try {
        const newCharity = await Charity.create({
          name,
          description,
          email,
          telephone,
          logo,
          address: {
            number,
            street,
            city,
            state,
            zipCode
          },
          ein,
          missionStatement,
          website,
          rating
        });
        console.log('New charity added:', newCharity);
        return newCharity;
      } catch (error) {
        console.log('Failed to add new charity with details:', name);
        return handleError(error, 'Error adding new charity');
      }
    },

    addDonation: async (_, { charityId, userId, amount }) => {
      console.log('Attempting to add donation with charityId:', charityId, 'userId:', userId, 'amount:', amount);
      try {
        const donation = await Donation.create({ charity: charityId, user: userId, amount });
        await User.findByIdAndUpdate(userId, { $push: { donations: donation._id } });
        console.log('New donation added:', donation);
        return donation;
      } catch (error) {
        console.log('Failed to add donation with charityId:', charityId);
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
          address: {
            number,
            street,
            city,
            state,
            zipCode
          }
        });
        await newUser.save();
        console.log('New user signed up:', newUser);
        return newUser;
      } catch (error) {
        console.log('Failed to sign up user with email:', email);
        return handleError(error, 'Failed to sign up user');
      }
    }
    ,

    signIn: async (_, { email, password }) => {
      console.log('Attempting to sign in user with email:', email);
      try {
        const user = await User.findOne({ email });
        if (!user || !(await user.validatePassword(password))) {
          console.log('Authentication failed for user with email:', email);
          throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);
        console.log('User signed in:', user);
        return { token, user };
      } catch (error) {
        console.log('Failed to sign in user with email:', email);
        return handleError(error, 'Error signing in user');
      }
    },
  },
};

module.exports = { resolvers };