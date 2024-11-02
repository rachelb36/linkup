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


export const IS_ADMIN = gql`     
  mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
  token
    user {
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
      photo
      occupation
    }
  }
`;

// Define the UPDATE_USER mutation
export const UPDATE_USER = gql`
mutation UpdateUser($userId: ID!, $input: UserInput!) {
  updateUser(userId: $userId, input: $input) {
    _id
    firstName
    lastName
    city
    state
    email
    occupation
    isAdmin
    photo
  }
}
`;


export const ADD_EVENT = gql`
mutation AddEvent($input: EventInput!) {
  addEvent(input: $input) {
    name
    description
    date
    city
    state
    time
    image
  }
}
`;




// Define the UPDATE_EVENT mutation
export const UPDATE_EVENT = gql`
mutation UpdateEvent($updateEventId: ID!, $input: EventInput!) {
  updateEvent(id: $updateEventId, input: $input) {
    id
    name
    description
    date
    time
    city
    state
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
      image
    }
  }
`;

// Define the ADD_TO_USER_LIKES mutation
export const ADD_TO_USER_LIKES = gql`
  mutation AddToUserLikes($eventId: ID!) {
    addToUserLikes(eventId: $eventId) {
      _id
    }
  }
`;
