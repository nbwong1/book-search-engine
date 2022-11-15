import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($bookId: ID!, $savedBook: Boolean) {
    addBook(bookId: $bookId, savedBook: $savedBook) {
      _id
      username
      savedBook {
        _id
        title
        authors
      }
    }
  }
`;
