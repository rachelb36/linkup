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
      address
      city
      state
      zip
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
      isAdmin
      firstName
      lastName
      address
      city
      state
      zip
      phoneNumber
      occupation
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
      address
      zip
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
      address
      zip
      time
      date
      image
    }
  }
`;

// export const RSVP_TO_EVENT = gql`
//   mutation rsvpToEvent($eventId: ID!, $status: String!) {
//     rsvpToEvent(eventId: $eventId, status: $status) {
//       _id
//       attendees {
//         userId
//         status
//       }
//     }
//   }
// `;
