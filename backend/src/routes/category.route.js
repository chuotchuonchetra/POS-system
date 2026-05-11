const router = require('express').Router();
const { getAllCategories, getAllCategoriesName,getSpecificCategory, createCategory,updateCategory,softDeleteCategory,hardDeleteCategory } = require('../../controllers/category.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth.middleware');

router.get('/', getAllCategories);
router.get('/name', getAllCategoriesName);
router.get('/:id', getSpecificCategory);
router.post('/', authMiddleware, roleMiddleware(['admin','owner']), createCategory);
router.put('/:id', authMiddleware, roleMiddleware(['admin','owner']), updateCategory);
router.delete('/:id', authMiddleware, roleMiddleware(['admin','owner']), softDeleteCategory);
router.delete('/:id/hard', authMiddleware, roleMiddleware(['admin','owner']), hardDeleteCategory);
module.exports = router;
