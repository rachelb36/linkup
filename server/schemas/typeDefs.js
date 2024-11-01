const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  # User type definition
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    city: String!
    state: String!
    phoneNumber: String!
    email: String!
    occupation: String!
    isAdmin: Boolean!
    likedEvents: [ID]
  }

  # Define UserInput for user-related mutations
  input UserInput {
    firstName: String!
    lastName: String!
    city: String
    state: String
    phoneNumber: String
    email: String!
    occupation: String
    password: String!
  }

  # Event type definition
  type Event {
    id: ID!
    description: String!
    name: String!
    city: String
    state: String
    time: String!
    date: Date!
    image: String
  }

  # EventInput input type for event mutations
  input EventInput {
    name: String!
    description: String!
    city: String
    state: String
    date: Date!
    time: String
    image: String
  }

  # Auth type for authentication responses
  type Auth {
    token: String!
    user: User!
  }

  # Queries
  type Query {
    me: User
    users: [User]
    events: [Event]
    event(id: ID!): Event
  }

  # Mutations
  type Mutation {
    login(email: String!, password: String!): Auth
    signup(userInput: UserInput!): Auth
    addUser(user: UserInput!): User
    updateUser(userId: ID!, input: UserInput!): User
    addEvent(input: EventInput!): Event
    updateEvent(id: ID!, input: EventInput!): Event
    deleteEvent(id: ID!): Boolean
    addUserToEvent(eventId: ID!): Event
    addToUserLikes(eventId: ID!): User
  }
`;

module.exports = typeDefs;
