const dotenv = require('dotenv');
const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

// call dotenv config while environment not in production
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

// declare the apollo server
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// start the graphql standalone server
startStandaloneServer(server, {
	listen: { port: +process.env.PORT || 4000 },
}).then(({ url }) => {
	console.log(`🚀  Server ready at: ${url}`);
});
