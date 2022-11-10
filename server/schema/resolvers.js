const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('books');
        },
        user: async (parent, { username })=> {
            return User.findOne({ username }).populate('books');
        },
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ createdAt: -1 });
        },
        book: async (parent, { bookId }) => {
            return Book.findOne({ _id: bookId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ -id: context.user._id }).populate('books');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) { 
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, profile };
        },

        addBook: async (parent, { title }, context) => {
            if (context.user) {
                const book = await Book.create({
                    title, 
                    authors,

                })
        // NWONG: updating here to add the book to the user's savedBooks
                return Profile.findOneAndUpdate(
                    { _id: profileId },
                    {
                        $addToSet: { skills: skill },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeProfile: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOneAndDelete({ _id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removeSkill: async (parent, { skill }, context) => {
            if (context.user) {
                return Profile.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { skills: skill } },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;