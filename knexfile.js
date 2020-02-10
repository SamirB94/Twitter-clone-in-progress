require('dotenv').config();

module.exports = {
	development: {
		client: 'mysql',
		connection: process.env.DB_URL,
		migrations: {
			directory: './data/migrations'
		},
		seeds: { directory: './data/seeds' }
	},

	testing: {
		client: 'mysql',
		connection: process.env.DB_URL,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	},

	production: {
		client: 'mysql',
		connection: process.env.DB_URL,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	}
};
