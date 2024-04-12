import { gql } from '@apollo/client';

export const GET_CHARITIES = gql`
  query GetCharities {
    charities {
      id
      name
      description
    }
  }
`;