import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      id
      email
      username
      desc
      createdAt
      updatedAt
      isPremium
    }
  }
`;

export const GET_USER = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      id
      email
      username
      desc
      createdAt
      updatedAt
      isPremium
      themeId
      links {
        id
        url
        title
        image
        userId
      }
      image {
        url
        key
      }
      theme {
        id
        image
        isPremium
        gradientFrom
        gradientTo
        angle
      }
    }
  }
`;

export const CREATE_LINK = gql`
  mutation Mutation(
    $url: String!
    $title: String!
    $userId: ID!
    $image: String
  ) {
    createLink(url: $url, title: $title, userId: $userId, image: $image) {
      id
      url
      title
      image
      userId
    }
  }
`;

export const DELETE_LINK = gql`
  mutation DeleteLink($deleteLinkId: ID!) {
    deleteLink(id: $deleteLinkId) {
      id
      url
      title
      image
      userId
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
      email
      username
      password
      desc
      createdAt
      updatedAt
      isPremium
      themeId
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query Query($username: String!) {
    userByUsername(username: $username) {
      id
      email
      username
      desc
      createdAt
      updatedAt
      isPremium
      themeId
      links {
        id
        url
        title
        image
        userId
      }
      image {
        url
        key
      }
      theme {
        id
        image
        isPremium
        gradientFrom
        gradientTo
        angle
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $updateUserId: ID!
    $email: String
    $username: String
    $password: String
    $desc: String
    $isPremium: Boolean
  ) {
    updateUser(
      id: $updateUserId
      email: $email
      username: $username
      password: $password
      desc: $desc
      isPremium: $isPremium
    ) {
      id
      email
      username
      password
      desc
      createdAt
      updatedAt
      isPremium
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation Mutation($userId: ID!, $url: String!, $key: String!) {
    updateImage(userId: $userId, url: $url, key: $key) {
      id
      url
      key
      userId
    }
  }
`;

export const CREATE_THEME = gql`
  mutation Mutation(
    $isPremium: Boolean!
    $gradientFrom: String!
    $gradientTo: String!
    $angle: Int!
    $image: String
  ) {
    createTheme(
      isPremium: $isPremium
      gradientFrom: $gradientFrom
      gradientTo: $gradientTo
      angle: $angle
      image: $image
    ) {
      id
      image
      isPremium
      gradientFrom
      gradientTo
      angle
    }
  }
`;

export const GET_THEMES = gql`
  query Query {
    themes {
      id
      image
      isPremium
      gradientFrom
      gradientTo
      angle
    }
  }
`;

export const UPDATE_USER_THEME = gql`
  mutation Mutation($userId: ID!, $themeId: ID!) {
    updateUserTheme(userId: $userId, themeId: $themeId) {
      id
      email
      username
      password
      desc
      createdAt
      updatedAt
      isPremium
      themeId
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation Mutation($amount: Int!, $userId: ID!) {
    createPayment(amount: $amount, userId: $userId) {
      id
      amount
      paymentDate
      userId
    }
  }
`;
