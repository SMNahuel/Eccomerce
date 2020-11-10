const { Router } = require('express');
// import all routers;
const categoryRouter = require('./category.js');
const productRouter = require('./product.js');
const ordersRouter = require('./orders.js');
const imageRouter = require('./image.js');
const userRouter = require('./user.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.use('/category', categoryRouter);
router.use('/products', productRouter);
router.use('/orders', ordersRouter);
router.use('/image', imageRouter);
router.use('/user', userRouter);
module.exports = router;
