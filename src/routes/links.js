const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// middlewares
const authentication = require('../middleware/authentication');
// controllers
const LinksController = require('../controllers/links.controller');
const FilesController = require('../controllers/files.controller');

// POST - create link for a file
router.post(
  '/',
  [
    check('original_name', 'Upload a file').notEmpty(),
    check('name', 'Upload a file').notEmpty()
  ],
  authentication,
  LinksController.create
);
// POST - check the password
router.post('/:url', LinksController.checkPassword);
// GET - get all links
router.get('/', LinksController.getAll);
// GET - get the link and file
router.get('/:url', LinksController.hasPassword, LinksController.get);

module.exports = router;
