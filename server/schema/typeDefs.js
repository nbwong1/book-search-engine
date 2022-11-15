const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: String
    description: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
    me: User
  }

  type Mutation {
    login(username: String!, email: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    addBook(title: String!, username: String!): Book
    removeBook(username: String!, bookId: ID!): Book
  }
`;

module.exports = typeDefs;
