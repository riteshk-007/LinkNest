const Schema = `#graphql
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    desc: String
    createdAt: String!
    updatedAt: String!
    isPremium: Boolean!
    links: [Link!]!
    image: Image
  }
  type Link {
  id: ID!
  url: String!
  title: String!
  image: String
  User: User
  userId: ID
}

type Image {
  id: ID!
  url: String!
  key: String!
  user: User!
  userId: String!
}

  type Query {
    users: [User!]!
    user(id: ID!): User
    userByUsername(username: String!): User
  }

  type Mutation {
    createUser(email: String!, username: String!, password: String!): User!
    createLink(url: String!, title: String!, image: String, userId: ID!): Link!
    deleteLink(id: ID!): Link!
    deleteUser(id: ID!): User!
    updateUser(id: ID!,email: String,username: String,password: String,desc: String,isPremium: Boolean): User!
    updateImage(userId: ID!, url: String!, key: String!): Image!
  }
`;

export default Schema;
