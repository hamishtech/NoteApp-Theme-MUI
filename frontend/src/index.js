import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client/react';
import ContextProvider from './state/userContext';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('tokenValue');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
