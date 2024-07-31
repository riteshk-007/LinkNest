import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $username: String!
    $password: String!
    $desc: String!
  ) {
    createUser(
      email: $email
      username: $username
      password: $password
      desc: $desc
    ) {
      id
      email
      username
      desc
      image
      createdAt
      updatedAt
      isPremium
    }
  }
`;

export const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      email
      username
      desc
      image
      createdAt
      updatedAt
      isPremium
      links {
        id
        url
        title
        image
        userId
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
      image
      createdAt
      updatedAt
      isPremium
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
      image
      createdAt
      updatedAt
      isPremium
      links {
        id
        url
        title
        image
        userId
      }
    }
  }
`;
