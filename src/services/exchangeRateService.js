const axios = require('axios');

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get('https://open.er-api.com/v6/latest/USD');
    return response.data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    throw new Error('Could not fetch exchange rates from external API');
  }
};

module.exports = {
  fetchExchangeRates
};
