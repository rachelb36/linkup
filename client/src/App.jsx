import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql', // Test this endpoint manually to ensure it works
});

// Construct request middleware to attach the JWT token to every request as an authorization header
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');

  // Log the token for debugging purposes
  console.log('JWT Token:', token);

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Combine authLink and httpLink
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Header />

      {/* //* Outlet will render the page components based on the current route */}
      <Outlet />
    </ApolloProvider>
  );
};

export default App;
