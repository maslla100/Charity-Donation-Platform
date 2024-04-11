// ./Charity-Donation-Platform/client/src/utils/API.js

import { gql, useMutation } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

// You can use useMutation with this gql tag in your SignIn component
