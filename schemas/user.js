const { comparePassword } = require('../helpers/bcrypt');
const dateScalar = require('../helpers/dateScalar');
const { signToken } = require('../helpers/jwt');
const errorHandler = require('../middlewares/errorHandler');
const { User } = require('../models');

const userTypeDefs = `#graphql
  scalar Date

  # user type
  type User {
    id: ID,
    username: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
  }

  # user login data
  type UserLogin {
    id: ID,
    username: String,
    email: String
  }

  # input while user register
  input NewUser {
    username: String!,
    email: String!,
    password: String!,
  }

  # Response Success Interface
  interface ResponseSuccess {
    code: String!
    success: Boolean!
    message: String!
  }

  # Response Success Register
  type ResponseRegister implements ResponseSuccess {
    code: String!,
    success: Boolean!
    message: String!,
    user: User
  }

  # Response Success Login
  type ResponseLogin implements ResponseSuccess {
    code: String!,
    success: Boolean!
    message: String!,
    access_token: String!
    user: UserLogin
  }
  
  # query user
  type Query {
    user: User
  }
  
  # mutation user
  type Mutation {
    register(user: NewUser): ResponseRegister
    login(email: String!, password: String!): ResponseLogin
  }
`;

const userResolvers = {
	// custom date scalar
	Date: dateScalar,
	Mutation: {
		// user register resolvers
		register: async (_, args) => {
			try {
				const { username, email, password } = args.user;
				let newUser = await User.create({
					username,
					email,
					password,
				});

				return {
					code: 201,
					success: true,
					message: 'Successfully Register',
					user: newUser,
				};
			} catch (error) {
				throw await errorHandler(error);
			}
		},
		// user login resolvers
		login: async (_, args) => {
			try {
				const { email, password } = args;

				if (!email) {
					throw {
						name: 'BadRequest',
						message: 'Email is required',
					};
				}

				if (!password) {
					throw {
						name: 'BadRequest',
						message: 'Password is required',
					};
				}

				// find the user from database
				const user = await User.findOne({ where: { email } });

				// check if user not founded or the password not the same
				if (!user || !comparePassword(password, user.password)) {
					throw {
						name: 'Unauthenticated',
						message: 'Invalid email/password',
					};
				}

				// sign access token with jsonwebtoken helper function
				const accessToken = signToken({ id: user.id, email: user.email });

				return {
					code: 200,
					success: true,
					message: 'Successfully Login',
					access_token: accessToken,
					user: {
						id: user.id,
						username: user.username,
						email: user.email,
					},
				};
			} catch (error) {
				throw await errorHandler(error);
			}
		},
	},
};

module.exports = {
	userTypeDefs,
	userResolvers,
};
