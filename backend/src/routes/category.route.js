const router = require('express').Router();
const { getAllCategories, getAllCategoriesName,getSpecificCategory, createCategory,updateCategory,softDeleteCategory,hardDeleteCategory } = require('../../controllers/category.controller');

router.get('/categories', getAllCategories);
router.get('/categories/:id', getSpecificCategory);
router.get('/categories/name', getAllCategoriesName);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', softDeleteCategory);
router.delete('/categories/:id/hard', hardDeleteCategory);
module.exports = router;