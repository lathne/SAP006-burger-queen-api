const { Router } = require('express');
const { getAllOrders } = require('../controller/ordersController');

const router = Router();

// requisições
router.get('/', getAllOrders);
// router.get('/:orderId');
// router.post('/');
// router.put('/:orderId');
// router.delete('/:orderId');

module.exports = router;
