import { gql } from '@apollo/client';

export const SEND_FEEDBACK = gql`
  mutation SendFeedback($name: String!, $email: String!, $message: String!) {
    sendFeedback(name: $name, email: $email, message: $message) {
      _id
      name
      email
      message
    }
  }
`;

export const SEND_INQUIRY = gql`
  mutation SendInquiry($name: String!, $email: String!, $message: String!) {
    sendInquiry(name: $name, email: $email, message: $message) {
      _id
      name
      email
      message
    }
  }
`;

export const ADD_DONATION = gql`
 mutation AddDonation($charityId: ID!, $amount: Float!) {
  addDonation(charityId: $charityId, amount: $amount) {
    id
    charity {
      _id
      name
    }
    amount
  }
}
`;

export const SIGNUP_AND_DONATE = gql`
mutation SignupAndDonate($firstName: String!, $lastName: String!, $email: String!, $password: String!, $number: String!, $street: String!, $city: String!, $state: String!, $zipCode: String!, $charityId: ID!, $amount: Float!) {
  signupAndDonate(firstName: $firstName, lastName: $lastName, email: $email, password: $password, number: $number, street: $street, city: $city, state: $state, zipCode: $zipCode, charityId: $charityId, amount: $amount) {
    token
    user {
      _id
      firstName
      lastName
      email
      address {
        number
        street
        city
        state
        zipCode
      }
    }
    donation {
      _id
      amount
      charity {
        _id
        name
      }
    }
  }
}
`;


export const SIGNUP_USER = gql`
  mutation SignupUser($firstName: String!, $lastName: String!, $email: String!, $password: String!,
  $number: String!, $street: String!, $city: String!, $state: String!, $zipCode: String!) {
    signupUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password,
      number: $number, street: $street, city: $city, state: $state, zipCode: $zipCode) {
      token
      user {
        _id
        firstName
        lastName
        email
        address {
          number
          street
          city
          state
          zipCode
        }
      }
    }
  }
`;



export const LOGIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;



