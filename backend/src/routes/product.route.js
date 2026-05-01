const router = require('express').Router();
const { getAllProducts, createProduct,updateProduct,softDeleteProduct,hardDeleteProduct } = require('../../controllers/product.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload');

router.get('/products',getAllProducts);
router.post('/products', authMiddleware,roleMiddleware(['admin','owner']),upload.single("image"),createProduct);
router.put('/products/:id', authMiddleware,roleMiddleware(['admin','owner']),upload.single("image"),updateProduct);
router.delete('/products/:id', authMiddleware,roleMiddleware(['admin','owner']),softDeleteProduct);
router.delete('/products/:id/hard', authMiddleware,roleMiddleware(['admin','owner']),hardDeleteProduct);
module.exports = router;