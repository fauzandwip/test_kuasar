'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'Email is required' },
					notNull: { msg: 'Email is required' },
					isEmail: { msg: 'Email already exists' },
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'Password is required' },
					notNull: { msg: 'Password is required' },
					len: {
						args: [5],
						msg: 'Password must be more than 5 characters',
					},
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: 'Username is required' },
					notNull: { msg: 'Username is required' },
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);

	User.beforeCreate((instance) => {
		instance.password = hashPassword(instance.password);
	});

	return User;
};
