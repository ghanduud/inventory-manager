// models/User.js
import { DataTypes } from 'sequelize';
import { sequelize } from './sqlite';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export async function addUser(userName) {
  try {
    // Synchronize the model with the database
    await sequelize.sync();

    // Check if the User table exists
    const tableExists = await sequelize.getQueryInterface().showAllTables();
    if (!tableExists.includes('User')) {
      // If the table doesn't exist, create it
      await User.sync();
      console.log('User table created.');
    } else {
      console.log('User table already exists.');
    }

    // Add 'Ghandy' to the table
    await User.create({ name: userName });
    console.log('User added.');

    // Log all users in the table
    const allUsers = await User.findAll();
    console.log('All users in the table:', allUsers);
    return 'User Added successfully';
  } catch (error) {
    console.error('Error syncing User model:', error);
    return 'user is not added';
  }
}
