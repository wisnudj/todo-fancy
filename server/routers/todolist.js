const express = require('express')
const router = express.Router()
const todolistController = require('../controllers/todolist')
const loginmiddle = require('../middleware/login');

router.get('/:id/all', loginmiddle,todolistController.getAllTask)
router.put('/:id/add', loginmiddle, todolistController.addTask)
router.put('/:id/delete', loginmiddle, todolistController.deleteTask)
router.put('/:id/tandaiselesai', loginmiddle, todolistController.tandaiselesai)
router.put('/:id/tandaibelum', loginmiddle, todolistController.tandaibelum)

module.exports = router;
