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
// serve static assets normally

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).

app.use(static('build'));
app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});
app.get('/health', (req, res) => {
  res.send('ok');
});

app.listen(process.env.PORT, () => {
  connect_DB();
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
