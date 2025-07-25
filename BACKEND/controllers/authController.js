// controllers/authController.js
const otpStore = require('../utils/otpStore');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const appendRowToSheet = require('../utils/sheetsSync');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    // Sync to Google Sheet (do not send password)
    try {
      await appendRowToSheet([
        user.name,
        user.email,
        '', // password (not sent)
        '', // OTP (not sent)
        'signup',
        new Date().toISOString(),
      ]);
    } catch (err) {
      console.error('Failed to sync to Google Sheet:', err.message);
    }
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.requestOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { otp, timestamp: Date.now() };
  // In production, send OTP via email
  console.log(`OTP for ${email}: ${otp}`);
  res.json({ message: 'OTP sent (simulated)', otp });
};

exports.verifyOTPAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const record = otpStore[email];
  if (record && record.otp === otp) {
    const user = await User.findOne({ email });
    if (user) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      delete otpStore[email];
      res.json({ message: 'Password reset successful' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.status(400).json({ error: 'Invalid or expired OTP' });
  }
};
