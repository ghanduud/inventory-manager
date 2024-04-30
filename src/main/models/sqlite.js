const { Sequelize, DataTypes } = require('sequelize');

export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './resources/indexDB.db',
	logging: false,
});

export const Category = sequelize.define('Category', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export const Inventory = sequelize.define('Inventory', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	location: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	maxCapacity: {
		type: DataTypes.INTEGER,
	},
	currentCapacity: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
});

export const Manufacture = sequelize.define('Manufacture', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phoneNumber: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
});

export const Material = sequelize.define('Material', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export const Size = sequelize.define('Size', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export const Type = sequelize.define('Type', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export const Item = sequelize.define('Item', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	weightPerPiece: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	pricePerKilo: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	numberOfPieces: {
		type: DataTypes.INTEGER,
	},
});

Item.belongsTo(Manufacture);
Item.belongsTo(Category);
Item.belongsTo(Type);
Item.belongsTo(Size);
Item.belongsTo(Inventory);
Item.belongsTo(Material);
