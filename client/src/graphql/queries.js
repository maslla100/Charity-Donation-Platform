import { gql } from '@apollo/client';

export const GET_CHARITIES = gql`




 query GetCharities {
  charities {
    id
    name
    description
    telephone
    address
    ein
    website
    image
    mission
    rating 
  }
}
`;


import { gql } from '@apollo/client';

export const FETCH_USER_DASHBOARD = gql`
  query FetchUserDashboard($userId: ID!) {
    user(id: $userId) {
      name
      email
      donations {
        charity {
          name
          description
        }
        amount
        date
      }
    }
  }
`;
