const { Router } = require('express');
const { getProducts } = require('../controller/productsController');

const router = Router();

// requisições
router.get('/', getProducts);
// router.get('/:productid');
// router.post('/');
// router.put('/:productid');
// router.delete('/:productid');

module.exports = router;
