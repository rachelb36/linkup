import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql', // Ensure this endpoint is correct
});

// Construct request middleware to attach the JWT token to every request as an authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token'); // Use 'id_token' if this is the correct key

  console.log('JWT Token:', token); // Log the token for debugging

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Error link to handle GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Combine the links: error -> auth -> HTTP
const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink), // Combines error handling, auth, and HTTP links
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Outlet /> {/* Outlet will render the page components based on the current route */}
    </ApolloProvider>
  );
};

export default App;
