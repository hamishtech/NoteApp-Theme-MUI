import { gql } from '@apollo/client';

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $details: String!, $category: String!) {
    createNote(title: $title, details: $details, category: $category) {
      title
      details
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id)
  }
`;
