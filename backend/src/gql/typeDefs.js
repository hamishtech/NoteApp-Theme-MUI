const { gql } = require('apollo-server');

const typeDefs = gql`
  type Note {
    title: String!
    details: String!
    date: String
    id: ID!
  }
  type Token {
    token: String
  }
  type User {
    id: ID!
    username: String!
    password: String!
    notes: [Note]
  }
  type Query {
    allNotes: [Note!]!
    getNotes: [Note!]
  }
  type Mutation {
    createNote(title: String, details: String): Note
    deleteNote(id: String): [String]
    createUser(username: String, password: String): User
    login(username: String, password: String): Token
  }
`;

//need to add update note mutation

module.exports = typeDefs;
