const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// middlewares
const authentication = require('../middleware/authentication');
// controllers
const AuthController = require('../controllers/auth.controller');

// POST - Authenticate the user
router.post(
  '/',
  [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password is required').notEmpty()
  ],
  AuthController.authenticate
);
// GET - Obtain the information of the user autenticated
router.get('/', authentication, AuthController.userAuthenticated);

module.exports = router;
