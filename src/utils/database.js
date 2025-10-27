const { Sequelize } = require('sequelize');

// Check if DATABASE_URL is provided (Railway standard)
if (process.env.DATABASE_URL) {
  // Use DATABASE_URL for Railway deployment
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Use individual environment variables for local development
  var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false
    }
  );
}

module.exports = sequelize;
