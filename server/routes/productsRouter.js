const { Router } = require('express');
const { getAllProducts } = require('../controller/productsController');

const router = Router();

// requisições
router.get('/', getAllProducts);
// router.get('/:productid');
// router.post('/');
// router.put('/:productid');
// router.delete('/:productid');

module.exports = router;
