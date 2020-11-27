const { Router } = require('express');
const router = Router();

router.use('/category', require('./category.js'));
router.use('/products', require('./product.js'));
router.use('/reviews', require('./reviews.js'));
router.use('/comment', require('./comment.js'));
router.use('/respond', require('./respond.js'));
router.use('/orders', require('./orders.js'));
router.use('/image', require('./image.js'));
router.use('/user', require('./user.js'));
router.use('/cart', require('./cart.js'));
router.use('/auth', require('./auth.js'));

module.exports = router;
