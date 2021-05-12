import { gql } from '@apollo/client';

export const GET_USER = gql`
  query {
    getUser {
      username
      notes {
        title
        details
        date
        category
        id
      }
    }
  }
`;
