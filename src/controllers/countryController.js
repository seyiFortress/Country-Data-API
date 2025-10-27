const {
  refreshCountries,
  getAllCountries,
  getCountryByName,
  deleteCountryByName
} = require('../services/countryService');
const path = require('path');
const fs = require('fs');

const refreshData = async (req, res) => {
  try {
    const result = await refreshCountries();
    res.json(result);
  } catch (error) {
    res.status(503).json({
      error: 'External data source unavailable',
      details: error.message
    });
  }
};

const getCountries = async (req, res) => {
  try {
    const filters = {};
    const sortBy = req.query.sort;
    
    if (req.query.region) {
      filters.region = req.query.region;
    }
    
    if (req.query.currency) {
      filters.currency = req.query.currency;
    }
    
    const countries = await getAllCountries(filters, sortBy);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCountry = async (req, res) => {
  try {
    const { name } = req.params;
    const country = await getCountryByName(name);
    res.json(country);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { name } = req.params;
    const result = await deleteCountryByName(name);
    res.json(result);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getImage = (req, res) => {
  try {
    console.log('[DEBUG] getImage called');
    const imagePath = path.join(__dirname, '../../cache/summary.png');
    console.log('[DEBUG] Image path:', imagePath);
    
    if (!fs.existsSync(imagePath)) {
      console.log('[DEBUG] Image file does not exist');
      return res.status(404).json({ error: 'Summary image not found' });
    }
    
    console.log('[DEBUG] Image file exists, sending file');
    res.sendFile(imagePath);
  } catch (error) {
    console.error('[DEBUG] Error in getImage:', error);
    console.error('[DEBUG] Error stack:', error.stack);
    res.status(500).json({ error: 'Internal server error', details: error.message, stack: error.stack });
  }
};

module.exports = {
  refreshData,
  getCountries,
  getCountry,
  deleteCountry,
  getImage
};
