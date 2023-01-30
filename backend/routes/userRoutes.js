const express = require('express');
const router = express.Router();
const { register, login, profile } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', isAuthenticated, profile);

module.exports = router;
