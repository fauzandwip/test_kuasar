const { userTypeDefs, userResolvers } = require('./user');

// all typeDefs and resolvers in this project

module.exports = {
	typeDefs: [userTypeDefs],
	resolvers: [userResolvers],
};
