const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './models/indexDB.db',
	logging: false,
});
