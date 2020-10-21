const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// middlewares
const authentication = require('../middleware/authentication');
// controllers
const LinksController = require('../controllers/links.controller');

router.post(
  '/',
  [
    check('original_name', 'Upload a file').notEmpty(),
    check('name', 'Upload a file').notEmpty()
  ],
  authentication,
  LinksController.create
);

module.exports = router;
