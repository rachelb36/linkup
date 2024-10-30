const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'mysecret';
const expiration = '2h';

module.exports = {
  // Function to create an AuthenticationError
  AuthenticationError: () => 
    new GraphQLError('Could not authenticate user.', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    }),

  // Middleware function to authenticate requests
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Split token if it’s in the Authorization header
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      // Verify token and attach user data to request
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

  // Function to sign a token
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
