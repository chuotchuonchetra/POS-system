const router = require('express').Router();
const { getProducts,getAllProducts,createProduct,updateProduct,softDeleteProduct,hardDeleteProduct } = require('../../controllers/product.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload');

router.get('/',getAllProducts);
router.get('/filtered',getProducts);
router.post('/', authMiddleware,roleMiddleware(['admin','owner']),upload.single("image"),createProduct);
router.put('/:id', authMiddleware,roleMiddleware(['admin','owner']),upload.single("image"),updateProduct);
router.delete('/:id', authMiddleware,roleMiddleware(['admin','owner']),softDeleteProduct);
router.delete('/:id/hard', authMiddleware,roleMiddleware(['admin','owner']),hardDeleteProduct);
module.exports = router;