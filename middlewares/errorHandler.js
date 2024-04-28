const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require('@apollo/server/errors');

const errorHandler = async (err) => {
	let message, messages, code, statusCode;

	switch (err.name) {
		case 'SequelizeValidationError':
			code = ApolloServerErrorCode.BAD_USER_INPUT;
			statusCode = 400;
			messages = err.errors.map((error) => {
				return error.message;
			});
			break;

		case 'BadRequest':
			code = ApolloServerErrorCode.BAD_USER_INPUT;
			statusCode = 400;
			message = err.message;
			break;

		case 'Unauthenticated':
			code = 'UNAUTHENTICATED';
			statusCode = 401;
			message = err.message;
			break;

		case 'SequelizeUniqueConstraintError':
			code = ApolloServerErrorCode.BAD_USER_INPUT;
			statusCode = 409;
			message = err.errors[0].message;
			break;

		default:
			code = ApolloServerErrorCode.INTERNAL_SERVER_ERROR;
			statusCode = 500;
			message = 'Internal Server Error';
			break;
	}

	console.log(message, messages, code);
	return new GraphQLError(message ? message : messages, {
		extensions: {
			code,
			http: {
				status: statusCode,
			},
		},
	});
};

module.exports = errorHandler;
