const express = require('express');
const rootRouter = express.Router();
const adminRouter = require('./adminRouters');
const customerRouter = require('./customerRouters');
const authRouter = require('./authRoutes');

rootRouter.use('/admin', adminRouter);
rootRouter.use('/customer', customerRouter);
rootRouter.use('/auth', authRouter);

module.exports = rootRouter; 