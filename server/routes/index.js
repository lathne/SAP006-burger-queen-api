const express = require('express');
const usersRouter = require('./usersRouter');
const ordersRouter = require('./ordersRouter');
const productsRouter = require('./productsRouter');

const router = express.Router();

// aqui vai todas as rotas
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/products', productsRouter);

module.exports = router;
