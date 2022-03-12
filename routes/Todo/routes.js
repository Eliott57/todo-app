const express = require('express');
const router = express.Router();

const todoCtrl = require('../../controllers/Todo/ControllerTodo');

router.get('/', todoCtrl.list);

router.get('/:id', todoCtrl.getOneItem);

router.post('/', todoCtrl.postItem);

router.delete('/:id', todoCtrl.deleteItem);

router.patch('/:id', todoCtrl.patchItem);

module.exports = router;