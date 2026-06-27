const express = require('express');
const router = express.Router();

const {registerAuth, loginAuth} = require('../controllers/authController.js')

router.post('/register', registerAuth);

router.post('/login', loginAuth);

module.exports = router;