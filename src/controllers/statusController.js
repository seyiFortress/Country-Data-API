const { getStatus } = require('../services/countryService');

const getStatusInfo = async (req, res) => {
  try {
    const status = await getStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getStatusInfo
};
