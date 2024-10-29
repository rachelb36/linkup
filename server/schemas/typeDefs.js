const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    email: String!
    isAdmin: Boolean!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    address: String!
    city: String!
    state: String!
    zip: String!
    phoneNumber: String!
    email: String!
    occupation: String!
    isAdmin: Boolean!
  }

  input UserInfo {
    firstName: String!
    lastName: String!
    address: String!
    phoneNumber: String!
    email: String!
    occupation: String!
  }

  type Event {
    id: ID!
    description: String!
    name: String!
    city: String
    state: String
    address: String
    zip: String
    time: String!
    date: Date!
    image: String
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User]
    events: [Event]
    event(id: ID!): Event
  }

  input EventInput {
    name: String!
    date: Date!
    description: String!
    image: String
  }

  input UserInput {
    firstName: String
    lastName: String
    address: String
    city: String
    state: String
    zip: String
    phoneNumber: String
    email: String
    occupation: String
    photo: String
    password: String
    isAdmin: Boolean
  }

  type Mutation {
    signup(userInput: UserInput): Auth
    login(email: String!, password: String!): Auth
    addUser(user: UserInfo!): User
    updateUser(
      userId: ID!
      firstName: String
      lastName: String
      occupation: String
    ): User
    addEvent(input: EventInput!): Event
    updateEvent(id: ID!, input: EventInput!): Event
    deleteEvent(id: ID!): Boolean
    addUserToEvent(eventId: ID!): Event
    addToUserLikes(eventId: ID!): User
  }
`;

module.exports = typeDefs;
