const express = require('express');
const router = express.Router();

// controllers
const UsersController = require('../controllers/users.controller');

router.post('/', UsersController.create);

module.exports = router;
