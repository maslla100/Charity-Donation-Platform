const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    charities: [Charity]
    charity(id: ID!): Charity
    donations: [Donation]
    donationsByUser(userId: ID!): [Donation]
    users: [User]
  }

  type Mutation {
    addCharity(name: String!, description: String!, website: String): Charity
    addDonation(charityId: ID!, userId: ID!, amount: Float!): Donation
    loginUser(email: String!, password: String!): User
    signUp(email: String!, password: String!): AuthPayload
    signIn(email: String!, password: String!): AuthPayload
  }

  type User {
    id: ID!
    email: String!
    token: String!
  }

  type Charity {
    id: ID!
    name: String!
    description: String!
    website: String
  }

  type Donation {
    id: ID!
    amount: Float!
    charity: Charity!
    user: User!
  }
  type AuthPayload {
  token: String
  user: User
}
`;

module.exports = { typeDefs };
