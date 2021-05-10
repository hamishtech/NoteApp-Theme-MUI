const { gql } = require('apollo-server');

const typeDefs = gql`
  type Note {
    title: String!
    details: String!
    date: String
    id: ID!
  }
  type User {
    id: ID!
    username: String!
    passwordHash: String!
    notes: [Note]
  }
  type Query {
    allNotes: [Note!]!
    getUser: User!
    getNotes: [Note!]
  }
  type Mutation {
    createNote(title: String, details: String): Note
    deleteNote(id: String): [String]
    createUser(username: String, password: String): User
  }
`;

//need to add updatenote mutation

module.exports = typeDefs;
