import { gql } from '@apollo/client';

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
