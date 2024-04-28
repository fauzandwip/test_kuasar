const dateScalar = require('../helpers/dateScalar');
const errorHandler = require('../middlewares/errorHandler');
const { User } = require('../models');

const userTypeDefs = `#graphql
  scalar Date

  type User {
    id: ID,
    username: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
  }

  input NewUser {
    username: String,
    email: String,
    password: String,
  }

  type Query {
    user: User
  }

  type Mutation {
    register(user: NewUser): User
  }
`;

const userResolvers = {
	Date: dateScalar,
	Mutation: {
		register: async (_, args) => {
			try {
				const { username, email, password } = args.user;
				let newUser = await User.create({
					username,
					email,
					password,
				});

				return newUser;
			} catch (error) {
				console.log(error.name);
				throw await errorHandler(error);
			}
		},
	},
};

module.exports = {
	userTypeDefs,
	userResolvers,
};
