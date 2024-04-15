import { gql } from '@apollo/client';

export const SEND_FEEDBACK = gql`
  mutation SendFeedback($name: String!, $email: String!, $message: String!) {
    sendFeedback(name: $name, email: $email, message: $message) {
      id
      name
      email
      message
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
    }
  }
`;

export const ADD_DONATION = gql`
 mutation AddDonation($charityId: ID!, $amount: Float!) {
  addDonation(charityId: $charityId, amount: $amount) {
    id
    charity {
      id
      name
    }
    amount
  }
}
`;

export const SIGNUP_AND_DONATE = gql`
mutation SignupAndDonate($firstName: String!, $lastName: String!, $email: String!, $password: String!, 
                    $number: String!, $street: String!, $city: String!, $state: String!, $zipCode: String!,
                    $charityId: ID!, $amount: Float!) {
  signupAndDonate(firstName: $firstName, lastName: $lastName, email: $email, password: $password, 
             address: { number: $number, street: $street, city: $city, state: $state, zipCode: $zipCode }, 
             charityId: $charityId, amount: $amount) {
    user {
      id
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
      id
      charity {
        id
        name
      }
      amount
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


