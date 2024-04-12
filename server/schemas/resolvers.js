const { User, Charity, Donation } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        charities: async () => {
            return await Charity.find({});
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
            return await User.find({});
        }
    },
    Mutation: {
        addCharity: async (_, { name, description, telephone, address, ein, website, image, mission, rating }) => {
            return await Charity.create({ name, description, telephone, address, ein, website, image, mission, rating });
        },
        addDonation: async (_, { charityId, userId, amount }) => {
            const donation = await Donation.create({ charity: charityId, user: userId, amount });
            await User.findByIdAndUpdate(userId, { $push: { donations: donation._id } });
            return donation;
        },
        signUp: async (_, { email, password }) => {
            const user = await User.create({ email, password });
            const token = signToken(user);
            return { token, user };
        },
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
