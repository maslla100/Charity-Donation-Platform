const typeDefs = `

  type Query {
    charities: [Charity]
    charity(id: ID!): Charity
    donations: [Donation]
    donationsByUser(userId: ID!): [Donation]
    users: [User]
  }

  type Mutation {
    addCharity(name: String!, description: String, email: String, telephone: String, logo: String, address: String, ein: String, missionStatement: String, website: String, rating: Float): Charity
    addDonation(charityId: ID!, userId: ID!, amount: Float!): Donation
    signupUser(firstName: String!, lastName: String!, email: String!, password: String!, number: String!, street: String!, city: String!, state: String!, zipCode: String!): Auth
    signIn(email: String!, password: String!): Auth
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    address: Address
    donations: [Donation]
  }

  type Address {
    number: String
    street: String
    city: String
    state: String
    zipCode: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Charity {
    _id: ID
    name: String
    description: String
    email: String
    telephone: String
    logo: String
    address: String
    ein: String
    missionStatement: String
    website: String
    rating: Float
    donations: [Donation]
  }

  type Donation {
    _id: ID!
    amount: Float
    charity: Charity
    user: User
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = { typeDefs };
