// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getTees } = require('../controllers/productController');

router.get('/tees', getTees);

module.exports = router;
