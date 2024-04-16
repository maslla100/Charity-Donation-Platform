import { gql } from '@apollo/client';

export const GET_CHARITIES = gql`
query GetCharities {
  charities {
    id
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
    mission
    rating 
  }
}

`;



export const Fetch_User_Dashboard = gql`
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