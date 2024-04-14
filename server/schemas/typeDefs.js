const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime

  type Query {
    charities: [Charity]
    charity(id: ID!): Charity
    donations: [Donation]
    donationsByUser(userId: ID!): [Donation]
    users: [User]
  }

  type Mutation {
    addCharity(name: String!, description: String, telephone: String, address: String, ein: String, website: String, image: String, mission: String, rating: Float): Charity
    addDonation(charityId: ID!, userId: ID!, amount: Float!): Donation
    signUp(email: String!, password: String!): AuthPayload
    addUser(name: String, email: String!, password: String!, address: String): User
  }

  type User {
    id: ID!
    name: String
    email: String!
    address: String
    token: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Charity {
    id: ID!
    name: String!
    description: String
    telephone: String
    address: String
    ein: String
    website: String
    image: String
    mission: String
    rating: Float
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Donation {
    id: ID!
    amount: Float!
    charity: Charity!
    user: User!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = { typeDefs };
