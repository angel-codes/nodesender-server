const express = require('express');
const router = express.Router();

// middlewares
const authentication = require('../middleware/authentication');
// controllers
const FilesController = require('../controllers/files.controller');

// POST - Upload a file
router.post('/', FilesController.upload);
// DELETE - Remove a file
router.delete('/:id', FilesController.remove);

module.exports = router;
