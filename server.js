require('dotenv').config();
const { sequelize, testConnection } = require('./src/utils/database');
const app = require('./src/app');
const PORT = process.env.PORT || 3000;

// Test database connection before starting server
const startServer = async () => {
  try {
    console.log('Starting server initialization...');
    
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('Failed to connect to database. Server will not start.');
      process.exit(1);
    }
    
    // Sync database models (create tables if they don't exist)
    console.log('Syncing database models...');
    await sequelize.sync({ alter: true });
    console.log('Database models synced successfully');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running successfully on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();
