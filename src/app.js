const express = require('express');
const countryRoutes = require('./routes/country');
const statusRoutes = require('./routes/status');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('cache'));

// Routes
app.use('/countries', countryRoutes);
app.use('/status', statusRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
