const { Sequelize } = require('sequelize');

// Enable logging in production for debugging
const enableLogging = process.env.NODE_ENV === 'production' ? console.log : false;

console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DB_HOST exists:', !!process.env.DB_HOST);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check if DATABASE_URL is provided (Railway standard)
if (process.env.DATABASE_URL) {
  // Use DATABASE_URL for Railway deployment
  console.log('Using DATABASE_URL for connection');
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: enableLogging,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Use individual environment variables for local development
  console.log('Using individual DB credentials for connection');
  var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: enableLogging
    }
  );
}

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

module.exports = { sequelize, testConnection };
