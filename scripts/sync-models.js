// Load environment variables first
require('dotenv').config();

// Add logging to validate database credentials
console.log('Database Configuration:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'undefined');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('---');

const sequelize = require('../src/utils/database');
const Country = require('../src/models/Country');

async function syncModels() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    console.log('Synchronizing models with database...');
    await sequelize.sync({ force: false }); // Set to true to drop and recreate tables
    console.log('Models synchronized successfully.');

    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
    process.exit(1);
  }
}

syncModels();