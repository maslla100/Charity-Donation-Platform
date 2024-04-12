const { User, Charity, Donation } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        charities: async () => {
            console.log("Fetching all charities");
            try {
                const allCharities = await Charity.find({});
                console.log("Charities found:", allCharities);
                return allCharities;
            } catch (error) {
                console.error("Error fetching charities:", error);
                throw new Error('Error fetching charities');
            }
        },
        charity: async (_, { id }) => {
            try {
                const charity = await Charity.findById(id);
                console.log("Charity found:", charity);
                return charity;
            } catch (error) {
                console.error("Error fetching charity by ID:", error);
                throw new Error('Error fetching charity by ID');
            }
        },
        donations: async () => {
            try {
                const donations = await Donation.find().populate('charity user');
                console.log("Donations found:", donations);
                return donations;
            } catch (error) {
                console.error("Error fetching donations:", error);
                throw new Error('Error fetching donations');
            }
        },
        donationsByUser: async (_, { userId }) => {
            try {
                const donations = await Donation.find({ user: userId }).populate('charity user');
                console.log("Donations by user found:", donations);
                return donations;
            } catch (error) {
                console.error("Error fetching donations by user:", error);
                throw new Error('Error fetching donations by user');
            }
        },
        users: async () => {
            try {
                const users = await User.find({});
                console.log("Users found:", users);
                return users;
            } catch (error) {
                console.error("Error fetching users:", error);
                throw new Error('Error fetching users');
            }
        }
    },
    Mutation: {
        addCharity: async (_, { name, description, telephone, address, ein, website, image, mission, rating }) => {
            try {
                const newCharity = await Charity.create({ name, description, telephone, address, ein, website, image, mission, rating });
                console.log("New charity added:", newCharity);
                return newCharity;
            } catch (error) {
                console.error("Error adding new charity:", error);
                throw new Error('Error adding new charity');
            }
        },
        addDonation: async (_, { charityId, userId, amount }) => {
            try {
                const donation = await Donation.create({ charity: charityId, user: userId, amount });
                await User.findByIdAndUpdate(userId, { $push: { donations: donation._id } });
                console.log("New donation added:", donation);
                return donation;
            } catch (error) {
                console.error("Error adding donation:", error);
                throw new Error('Error adding donation');
            }
        },
        signUp: async (_, { email, password }) => {
            try {
                const user = await User.create({ email, password });
                const token = signToken(user);
                console.log("New user signed up:", user);
                return { token, user };
            } catch (error) {
                console.error("Error signing up user:", error);
                throw new Error('Error signing up user');
            }
        },
        signIn: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user || !(await user.validatePassword(password))) {
                    throw new Error('Incorrect credentials');
                }
                const token = signToken(user);
                console.log("User signed in:", user);
                return { token, user };
            } catch (error) {
                console.error("Error signing in user:", error);
                throw new Error('Error signing in user');
            }
        },
    }
};

module.exports = resolvers;
