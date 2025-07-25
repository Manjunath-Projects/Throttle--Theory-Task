// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  requestOTP,
  verifyOTPAndResetPassword,
} = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/forgot-password', requestOTP);
router.post('/reset-password', verifyOTPAndResetPassword);

module.exports = router;
