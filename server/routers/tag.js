const express = require('express')
const router = express.Router()
const tagController = require('../controllers/tag')
const loginmiddle = require('../middleware/login');

router.get('/:id/tag/all', loginmiddle,todolistController.getAllTag)
router.put('/:id/tag/add', loginmiddle, todolistController.addTag)
router.put('/:id/tag/delete', loginmiddle, todolistController.deleteTag)

module.exports = router;
