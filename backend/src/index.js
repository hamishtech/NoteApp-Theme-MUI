const { ApolloServer } = require('apollo-server');
const typeDefs = require('./gql/typeDefs');
const resolvers = require('./gql/resolvers');
const connect_DB = require('./database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
      return;
    }
  },
});

server.listen().then(({ url }) => {
  connect_DB();
  console.log(`Server ready at ${url}`);
});
