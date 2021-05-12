const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./gql/typeDefs');
const resolvers = require('./gql/resolvers');
const connect_DB = require('./database');
const jwt = require('jsonwebtoken');
const express = require('express');
require('dotenv').config();
var cors = require('cors');
const { static } = require('express');
const path = require('path');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log(req.headers.authorization);
    try {
      if (!req.headers.authorization) {
        return;
      }
      const rawToken = req.headers.authorization || '';
      const token = rawToken.substring(7);
      const user = jwt.verify(token, process.env.SECRET);
      return { user };
    } catch (error) {
      return { error: 'could not validate user' };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.use(cors());
app.use(static(path.join(__dirname, '../../frontend/build')));

app.listen(process.env.PORT, () => {
  connect_DB();
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
