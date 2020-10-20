const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// controllers
const AuthController = require('../controllers/auth.controller');

// POST - Authenticate the user
router.post('/', AuthController.authenticate);
// GET - Obtain the information of the user autenticated
router.get('/', AuthController.userAuthenticated);

module.exports = router;
