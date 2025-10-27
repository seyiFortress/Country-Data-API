const express = require('express');
const router = express.Router();
const { getStatusInfo } = require('../controllers/statusController');

router.get('/', getStatusInfo);

module.exports = router;
