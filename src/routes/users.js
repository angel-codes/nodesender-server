const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// controllers
const UsersController = require('../controllers/users.controller');

router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({
      min: 6
    })
  ],
  UsersController.create
);

module.exports = router;
