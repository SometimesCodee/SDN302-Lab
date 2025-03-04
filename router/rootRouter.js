const express = require('express');
const rootRouter = express.Router();
const productRouter = require('./productRouters');
const categoryRouter = require('./categoryRouters');
const authRouter = require('./authRoutes');

rootRouter.use('/auth', authRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/category', categoryRouter);

module.exports = rootRouter; 