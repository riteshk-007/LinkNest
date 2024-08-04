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
    themeId: ID
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

type Theme {
  id: ID!
  image: String
  isPremium: Boolean!
  gradientFrom: String!
  gradientTo: String!
  angle: Int!
}

  type Query {
    users: [User!]!
    user(id: ID!): User
    userByUsername(username: String!): User
    themes: [Theme!]!
  }

  type Mutation {
    createUser(email: String!, username: String!, password: String!): User!
    createLink(url: String!, title: String!, image: String, userId: ID!): Link!
    deleteLink(id: ID!): Link!
    deleteUser(id: ID!): User!
    updateUser(id: ID!,email: String,username: String,password: String,desc: String,isPremium: Boolean): User!
    updateImage(userId: ID!, url: String!, key: String!): Image!
    createTheme(image: String, isPremium: Boolean!, gradientFrom: String!, gradientTo: String!, angle: Int!): Theme!
  }
`;

export default Schema;
