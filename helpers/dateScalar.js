const { GraphQLScalarType } = require('graphql');

// custom date scalar
const dateScalar = new GraphQLScalarType({
	name: 'Date',
	description: 'Date custom scalar type',
	serialize(value) {
		return value;
	},
	parseValue(value) {
		if (value === 'number') {
			return new Date(value);
		}
	},
});

module.exports = dateScalar;
