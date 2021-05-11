import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USER } from '../gql/queries';

export const UserContext = React.createContext('');

const ContextProvider = ({ children }) => {
  const { data, refetch } = useQuery(GET_USER);

  return (
    <UserContext.Provider value={[data, refetch]}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
