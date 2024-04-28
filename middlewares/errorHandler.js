const { GraphQLError } = require('graphql');

const errorHandler = async (err) => {
	let message, messages, code, statusCode;

	switch (err.name) {
		case 'SequelizeUniqueConstraintError':
			code = 'BAD_USER_INPUT';
			message = err.errors[0].message;
			statusCode = 409;
			break;

		case 'SequelizeValidationError':
			code = 'BAD_USER_INPUT';
			messages = err.errors.map((error) => {
				return error.message;
			});
			statusCode = 400;
			break;

		default:
			code = 'INTERNAL_SERVER_ERROR';
			statusCode = 500;
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
