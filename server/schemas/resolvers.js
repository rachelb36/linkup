
const { signToken } = require('../utils/auth');
const { User, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('User not authenticated');
    },


    users: async (_, __, context) => {
      if (context.user && context.user.isAdmin) {
        return await User.find({});
      }
      throw new AuthenticationError('User not authenticated or lacks permissions');
    },

    events: async () => {
      return await Event.find({});
    },

    event: async (_, { id }) => {
      return await Event.findById(id);
    },
  },

  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      try {
      if (!user) {
        throw new AuthenticationError('No user found with this email');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('toastify error');
        if (!user) {
          throw new AuthenticationError('toastify error');
        }
      }

    signup: async (_, { userInput }) => {
      const user = await User.create({ ...userInput });
      const token = signToken(user);
      return { token, user };
    },


    addUser: async (_, { user }, context) => {
      if (context.user) {
        return await User.create(user);
      }
      throw new AuthenticationError('User not authenticated');
    },

    updateUser: async (_, { userId, input }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(userId, input, { new: true });
      }
      throw new AuthenticationError('User not authenticated');
    },

    addEvent: async (_, { input }, context) => {
      if (context.user && context.user.isAdmin) {
        return await Event.create(input);
      }
      throw new AuthenticationError('User not authorized to create events');
    },

    updateEvent: async (_, { id, input }, context) => {
      if (context.user && context.user.isAdmin) {
        return await Event.findByIdAndUpdate(id, input, { new: true });
      }
      throw new AuthenticationError('Authorized user verified.');
    },

    deleteEvent: async (_, { id }, context) => {
      if (context.user && context.user.isAdmin) {
        const event = await Event.findByIdAndDelete(id);
        return !!event;
      }
      throw new AuthenticationError('User not authorized to delete events');
    },

    addUserToEvent: async (_, { eventId }, context) => {
      if (context.user) {
        return await Event.findByIdAndUpdate(
          eventId,
          { $addToSet: { users: context.user._id } },
          { new: true }
        );
      }
      throw new AuthenticationError('User not authenticated');
    },
    
    addToUserLikes: async (_, { eventId }, context) => {
      if (context.user) {
        try {
          return await User.findByIdAndUpdate(
            context.user._id,
            { $addToSet: { likedEvents: eventId } },
            { new: true }
          );
        } catch (err) {
          console.log(err);
          throw new Error('Failed to add to user likes');
        }
      }
      throw new AuthenticationError('User not authenticated');
    },
  },
};

module.exports = resolvers;
