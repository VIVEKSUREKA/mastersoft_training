// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/userModel');

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword, role: 'user' });
    await user.save();

    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      config.secret,
      { expiresIn: '1h' } // Set expiresIn to 1 hour
    );

    res.status(201).json({ success: true, message: 'Registration successful', accessToken, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) return res.status(404).send('User not found');

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {

        const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        config.secret,
        { expiresIn: '1h' } // Set expiresIn to 1 hour
        );

        res.json({ success: true, message: 'Login successful', accessToken, username: user.username });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
};
