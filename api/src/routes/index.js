const { Router } = require('express');
const router = Router();

router.use('/category', require('./category.js'));
router.use('/products', require('./product.js'));
router.use('/orders', require('./orders.js'));
router.use('/image', require('./image.js'));
router.use('/user', require('./user.js'));
router.use('/cart', require('./cart.js'));

module.exports = router;
