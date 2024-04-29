const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
	signToken: (payload) => {
		return jwt.sign(payload, JWT_SECRET_KEY);
	},
	verifyToken: (token) => {
		return jwt.verify(token, JWT_SECRET_KEY);
	},
};
