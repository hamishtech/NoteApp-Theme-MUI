const { gql } = require('apollo-server');

const typeDefs = gql`
  type Note {
    title: String!
    details: String!
    date: String
    category: String!
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
    getUser: User
  }
  type Mutation {
    createNote(title: String, details: String, category: String): Note
    deleteNote(id: String): String
    createUser(username: String, password: String): Token
    login(username: String, password: String): Token
    editNote(title: String, details: String, category: String, id: ID): Note
  }
`;

//need to add update note mutation

module.exports = typeDefs;
