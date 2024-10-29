const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: async function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('No token found');
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // const user = await User.findById(data._id);

      // if (!user) {
      //   throw new GraphQLError('User not found', {
      //     extensions: { code: 'UNAUTHENTICATED' },
      //   });
      // }

      req.user = data;
      console.log('Token verified, user data:', req.user);
    } catch (error) {
      console.error('Invalid token:', error);
      return req;
      // throw new GraphQLError('Invalid token', {
      //   extensions: { code: 'UNAUTHENTICATED' },
      // });
    }

    return req;
  },

  signToken: function ({ email, _id }) {
    const payload = { email, _id };
    const token = jwt.sign({ data: payload }, secret, {
      expiresIn: expiration,
    });
    console.log('Token created:', token);
    return token;
  },
};
