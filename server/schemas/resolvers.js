const { User, Charity, Donation } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        charities: async () => {
            return await Charity.find();
        },
        charity: async (_, { id }) => {
            return await Charity.findById(id);
        },
        donations: async () => {
            return await Donation.find().populate('charity user');
        },
        donationsByUser: async (_, { userId }) => {
            return await Donation.find({ user: userId }).populate('charity user');
        },
        users: async () => {
            return await User.find();
        }
    },
    Mutation: {
        addCharity: async (_, { name, description, website }) => {
            return await Charity.create({ name, description, website });
        },
        addDonation: async (_, { charityId, userId, amount }) => {
            // Create a new donation document
            const donation = await Donation.create({ charity: charityId, user: userId, amount });

            // Add the donation to the user's list of donations
            await User.findByIdAndUpdate(userId, { $push: { donations: donation._id } });

            return donation;
        },

        // Sign up a new user
        signUp: async (_, { email, password }) => {
            const user = await User.create({ email, password });
            const token = signToken(user);
            return { token, user };
        },
        // Sign in a user
        signIn: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await user.validatePassword(password))) {
                throw new Error('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },

    }
};

module.exports = resolvers;
