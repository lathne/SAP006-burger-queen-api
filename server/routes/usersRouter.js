const { Router } = require('express');
const { getAllUsers } = require('../controller/usersController');

const router = Router();

// requisições
router.get('/', getAllUsers);
// router.get('/:uid');
// router.post('/');
// router.put('/:uid');
// router.delete('/:uid');

module.exports = router;
