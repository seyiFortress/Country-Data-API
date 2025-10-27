require('dotenv').config();
const axios = require('axios');
const Country = require('../models/Country');
const { fetchExchangeRates } = require('./exchangeRateService');
const { generateSummaryImage } = require('./imageService');

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    throw new Error('Could not fetch countries from external API');
  }
};

const refreshCountries = async () => {
  try {
    // Fetch countries and exchange rates
    const countries = await fetchCountries();
    const exchangeRates = await fetchExchangeRates();
    
    // Process each country
    const processedCountries = countries.map(country => {
      // Extract currency code
      let currencyCode = null;
      if (country.currencies && country.currencies.length > 0) {
        currencyCode = country.currencies[0].code;
      }
      
      // Get exchange rate
      let exchangeRate = null;
      if (currencyCode && exchangeRates[currencyCode]) {
        exchangeRate = exchangeRates[currencyCode];
      }
      
      // Calculate estimated GDP
      let estimatedGdp = null;
      if (exchangeRate && country.population) {
        const randomMultiplier = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
        estimatedGdp = (country.population * randomMultiplier) / exchangeRate;
      } else if (!currencyCode || !exchangeRate) {
        estimatedGdp = 0;
      }
      
      return {
        name: country.name,
        capital: country.capital || null,
        region: country.region || null,
        population: country.population || 0,
        currency_code: currencyCode,
        exchange_rate: exchangeRate,
        estimated_gdp: estimatedGdp,
        flag_url: country.flag || null,
        last_refreshed_at: new Date()
      };
    });
    
    // Update or insert countries in the database
    for (const countryData of processedCountries) {
      await Country.upsert(countryData, {
        conflictFields: ['name'],
        updateOnDuplicate: [
          'capital', 'region', 'population', 'currency_code', 
          'exchange_rate', 'estimated_gdp', 'flag_url', 'last_refreshed_at'
        ]
      });
    }
    
    // Generate summary image
    await generateSummaryImage();
    
    return {
      success: true,
      message: `Successfully refreshed ${processedCountries.length} countries`
    };
  } catch (error) {
    console.error('Error refreshing countries:', error.message);
    throw error;
  }
};

const getAllCountries = async (filters = {}, sortBy = null) => {
  const whereClause = {};
  
  // Apply filters
  if (filters.region) {
    whereClause.region = filters.region;
  }
  
  if (filters.currency) {
    whereClause.currency_code = filters.currency;
  }
  
  // Apply sorting
  let order = [];
  if (sortBy) {
    if (sortBy === 'gdp_desc') {
      order = [['estimated_gdp', 'DESC']];
    } else if (sortBy === 'gdp_asc') {
      order = [['estimated_gdp', 'ASC']];
    } else if (sortBy === 'name_asc') {
      order = [['name', 'ASC']];
    } else if (sortBy === 'name_desc') {
      order = [['name', 'DESC']];
    }
  }
  
  return await Country.findAll({
    where: whereClause,
    order: order.length > 0 ? order : [['name', 'ASC']]
  });
};

const getCountryByName = async (name) => {
  const country = await Country.findOne({
    where: {
      name: name
    }
  });
  
  if (!country) {
    const error = new Error('Country not found');
    error.status = 404;
    throw error;
  }
  
  return country;
};

const deleteCountryByName = async (name) => {
  const country = await Country.findOne({
    where: {
      name: name
    }
  });
  
  if (!country) {
    const error = new Error('Country not found');
    error.status = 404;
    throw error;
  }
  
  await country.destroy();
  return { success: true, message: `Country ${name} deleted successfully` };
};

const getStatus = async () => {
  const totalCountries = await Country.count();
  const lastRefreshed = await Country.max('last_refreshed_at');
  
  return {
    total_countries: totalCountries,
    last_refreshed_at: lastRefreshed
  };
};

module.exports = {
  refreshCountries,
  getAllCountries,
  getCountryByName,
  deleteCountryByName,
  getStatus
};
