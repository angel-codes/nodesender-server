const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// middlewares
const authentication = require('../middleware/authentication');
// controllers
const LinksController = require('../controllers/links.controller');

router.post('/', authentication, LinksController.create);

module.exports = router;
