import { gql } from '@apollo/client';

export const SEND_FEEDBACK = gql`
  mutation SendFeedback($name: String!, $email: String!, $message: String!) {
    sendFeedback(name: $name, email: $email, message: $message) {
      id
      name
      email
      message
      createdAt
    }
  }
`;

export const SEND_INQUIRY = gql`
  mutation SendInquiry($name: String!, $email: String!, $message: String!) {
    sendInquiry(name: $name, email: $email, message: $message) {
      id
      name
      email
      message
      createdAt
    }
  }
`;

export const ADD_DONATION = gql`
  mutation AddDonation($charityId: ID!, $amount: Float!) {
    addDonation(charityId: $charityId, amount: $amount) {
      id
      charity {
        name
      }
      amount
    }
  }
`;

export const SIGNUP_AND_DONATE = gql`
  mutation SignupAndDonate($name: String!, $email: String!, $password: String!, $charityId: ID!, $amount: Float!) {
    signupAndDonate(name: $name, email: $email, password: $password, charityId: $charityId, amount: $amount) {
      user {
        id
        name
        email
      }
      donation {
        id
        amount
        charity {
          id
          name
        }
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!, $address: String!) {
  signupUser(name: $name, email: $email, password: $password, address: $address) {
    id
    name
    email
    address
  }
}

`;
