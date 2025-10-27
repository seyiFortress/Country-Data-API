const express = require('express');
const router = express.Router();
const {
  refreshData,
  getCountries,
  getCountry,
  deleteCountry,
  getImage
} = require('../controllers/countryController');

router.post('/refresh', refreshData);
router.get('/', getCountries);
router.get('/image', getImage);
router.get('/:name', getCountry);
router.delete('/:name', deleteCountry);

module.exports = router;
