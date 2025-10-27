const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
  try {
    // Connect to MySQL server without specifying a database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    const dbName = process.env.DB_NAME || 'country_api';
    
    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' created or already exists`);
    
    // Close the connection
    await connection.end();
    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Error creating database:', error);
    process.exit(1);
  }
}

createDatabase();