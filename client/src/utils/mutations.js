import { gql } from '@apollo/client';

// Login user
export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;

// Define the SIGNUP mutation
export const SIGNUP = gql`
  mutation Signup($userInput: UserInput) {
    signup(userInput: $userInput) {
      token
      user {
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
  }
`;

export const ADD_EVENT = gql`
  mutation AddEvent($input: EventInput!) {
    addEvent(input: $input) {
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

export const UPDATE_EVENT = gql`
  mutation Mutation($updateEventId: ID!, $input: EventInput!) {
    updateEvent(id: $updateEventId, input: $input) {
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

export const ADD_USER_TO_EVENT = gql`
  mutation AddUserToEvent($eventId: ID!) {
    addUserToEvent(eventId: $eventId) {
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



export const ADD_TO_USER_LIKES = gql`
  mutation AddToUserLikes($eventId: ID!) {
    addToUserLikes(eventId: $eventId) {
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
