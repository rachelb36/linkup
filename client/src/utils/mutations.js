import { gql } from '@apollo/client';

// Login user
export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        firstName
        isAdmin
      }
    }
  }
`;

// Define the SIGNUP mutation
export const SIGNUP = gql`
  mutation Signup($userInput: UserInput!) {
    signup(userInput: $userInput) {
      token
      user {
        _id
        email
        firstName
        lastName
        city
        state
        phoneNumber
        occupation
      }
    }
  }
`;

// Define the ADD_USER mutation
export const ADD_USER = gql`
  mutation Mutation($user: UserInfo!) {
    addUser(user: $user) {
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

// Define the UPDATE_USER mutation
export const UPDATE_USER = gql`
  mutation Mutation($userId: ID!, $input: UserInfo!) {
    updateUser(userId: $userId, input: $input) {
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

// Define the ADD_EVENT mutation
export const ADD_EVENT = gql`
  mutation AddEvent($input: EventInput!) {
    addEvent(input: $input) {
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

// Define the UPDATE_EVENT mutation
export const UPDATE_EVENT = gql`
  mutation Mutation($updateEventId: ID!, $input: EventInput!) {
    updateEvent(id: $updateEventId, input: $input) {
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

// Define the DELETE_EVENT mutation
export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

// Define the ADD_USER_TO_EVENT mutation
export const ADD_USER_TO_EVENT = gql`
  mutation AddUserToEvent($eventId: ID!) {
    addUserToEvent(eventId: $eventId) {
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

// Define the ADD_TO_USER_LIKES mutation
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
