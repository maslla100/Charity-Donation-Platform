import { gql } from '@apollo/client';

export const GET_CHARITIES = gql`
query GetCharities {
  charities {
    _id
    name
    description
    telephone
    address {
      number
      street
      city
      state
      zipCode
    }
    ein
    website
    image
    missionStatement
    rating 
  }
}

`;



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

export const GET_USER_DONATIONS = gql`
    query GetUserDonations($userId: ID!) {
        getUserDonations(userId: $userId) {
            _id
            amount
            charity {
                _id
                name
            }
        }
    }
`;