const { ApolloServer } = require('apollo-server');
const typeDefs = require('./gql/typeDefs');
const resolvers = require('./gql/resolvers');
const connect_DB = require('./database');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  connect_DB();
  console.log(`Server ready at ${url}`);
});
