const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    register user
// @route   POST /api/users/register
// @access  public
const register = asyncHandler( async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) {
    res.status(400);
    throw new Error('Please add required fields');
  }
  // Check if user already exists
  const userExists = await User.findOne({ username });
  if(userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    password: hashedPassword
  });

  if(user) {
    res.status(201).json({
      _id: user.id,
      username,
      password,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data')
  }
}); 

// @desc    login user
// @route   POST /api/users/login
// @access  public
const login = asyncHandler( async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username});
  if(user && await (bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user.id)
    })
  } else {
    res.status(400).json({message: 'Invalid credentials'});
  }
});

// @desc    get user data
// @route   GET /api/users/profile
// @access  private
const profile = asyncHandler( async (req, res) => {
  res.status(200).json(req.user);
});

// JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
  register,
  login,
  profile
}
