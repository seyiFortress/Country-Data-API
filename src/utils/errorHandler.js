const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
    
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }
  
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: {
        [err.errors[0].path]: 'already exists'
      }
    });
  }
  
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }
  
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;
