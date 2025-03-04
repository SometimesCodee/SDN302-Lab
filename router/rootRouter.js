const express = require('express');
const rootRouter = express.Router();
const productRouter = require('./productRouters');
const categoryRouter = require('./categoryRouters');
const orderRouter = require('./orderRouters');
const authRouter = require('./authRouters');


rootRouter.use('/product', productRouter);
rootRouter.use('/category', categoryRouter);
rootRouter.use('/order', orderRouter);
rootRouter.use('/auth', authRouter);


module.exports = rootRouter; 