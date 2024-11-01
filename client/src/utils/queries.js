import { gql } from '@apollo/client';

// Get all users
export const GET_ALL_USERS = gql`
  query Users {
    users {
      _id
      email
      isAdmin
      firstName
      lastName
      city
      state
      phoneNumber
      occupation
    }
  }
`;

// Get the current user (me)
export const GET_ME = gql`
  query Query {
    me {
      _id
      email
      firstName
      lastName
      city
      state
      phoneNumber
      occupation
      likedEvents
    }
  }
`;

// Get all events
export const GET_ALL_EVENTS = gql`
  query Events {
    events {
      id
      description
      name
      city
      state
      time
      date
      image
    }
  }
`;

// Get a specific event by ID
export const GET_EVENT = gql`
  query Event($eventId: ID!) {
    event(id: $eventId) {
      id
      description
      name
      city
      state
      time
      date
      image
    }
  }
`;
