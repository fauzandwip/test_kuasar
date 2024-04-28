const dotenv = require('dotenv');
const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: +process.env.PORT || 3000 },
}).then(({ url }) => {
	console.log(`🚀  Server ready at: ${url}`);
});
