import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
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
