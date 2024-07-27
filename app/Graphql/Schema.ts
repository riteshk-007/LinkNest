const Schema = `#graphql
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    desc: String
    image: String
    createdAt: String!
    updatedAt: String!
    isPremium: Boolean!
    links: [Link!]!
  }
  type Link {
  id: ID!
  url: String!
  title: String!
  image: String
  User: User
  userId: ID
}

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(email: String!, username: String!, password: String!): User!
  }
`;

export default Schema;
