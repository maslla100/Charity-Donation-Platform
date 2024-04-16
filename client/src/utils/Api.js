import { gql } from '@apollo/client';

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

