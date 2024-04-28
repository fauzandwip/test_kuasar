const { userTypeDefs, userResolvers } = require('./user');

module.exports = {
	typeDefs: [userTypeDefs],
	resolvers: [userResolvers],
};
