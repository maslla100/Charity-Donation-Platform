const typeDefs = `

type Query {
  charities: [Charity]
  charity(_id: ID!): Charity
  donations: [Donation]
  donationsByUser(userId: ID!): [Donation]
  users: [User]
  getUserDonations(userId: ID!): [Donation]
}

type Mutation {
  addCharity(name: String!, description: String!, email: String!, telephone: String!, logo: String!, address: AddressInput!, ein: String!, missionStatement: String!, website: String!, rating: Float): Charity
  addDonation(charityId: ID!, userId: ID!, amount: Float!): Donation    
  signupUser(firstName: String!, lastName: String!, email: String!, password: String!, number: String!, street: String!, city: String!, state: String!, zipCode: String!): Auth
  signIn(email: String!, password: String!): AuthPayload
  sendFeedback(input: FeedbackInput!): FeedbackResponse

}

type Feedback {
  _id: ID!
  name: String!
  email: String!
  message: String!
  createdAt: String!
}

input FeedbackInput {
  name: String!
  email: String!
  message: String!
}

type FeedbackResponse {
  _id: ID
  name: String
  email: String
  success: Boolean!
  message: String!
  feedback: Feedback
}



type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  address: Address
  donations: [Donation]
  name: String # Computed field
}

type Address {
  number: String!
  street: String!
  city: String!
  state: String!
  zipCode: String!
}

type Auth {
  token: ID
  user: User
}

"""
Represents a single charity with related information.
"""
type Charity {
  _id: ID!
  name: String!
  description: String!
  email: String!
  telephone: String!
  logo: String!
  address: Address!
  ein: String!
  missionStatement: String!
  website: String!
  rating: String
  donations: [Donation]
  image: String
}

type Donation {
  _id: ID!
  amount: Float!
  charity: Charity!
  user: User!
  createdAt: String
}

type AuthPayload {
  token: String
  user: User
}

input AddressInput {
  number: String!
  street: String!
  city: String!
  state: String!
  zipCode: String!
}

`;



module.exports = { typeDefs };
