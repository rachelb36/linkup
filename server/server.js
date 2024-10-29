const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // GraphQL middleware
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: authMiddleware,
      })
    );

    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    // Start the database connection
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
      });
    });

    // Error handling for database connection
    db.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  } catch (error) {
    console.error('Apollo Server failed to start', error);
  }
};

// Start the Apollo Server
startApolloServer();
