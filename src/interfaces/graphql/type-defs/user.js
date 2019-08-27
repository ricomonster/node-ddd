module.exports = /* GraphQL */ `
  type Query {
    me: User
  }

  type User {
    id: ID!
    name: String
    email: String
    emailVerifiedAt: DateTime
    password: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
