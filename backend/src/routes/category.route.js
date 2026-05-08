const router = require('express').Router();
const { getAllCategories, getAllCategoriesName,getSpecificCategory, createCategory,updateCategory,softDeleteCategory,hardDeleteCategory } = require('../../controllers/category.controller');

router.get('/', getAllCategories);
router.get('/:id', getSpecificCategory);
router.get('/name', getAllCategoriesName);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', softDeleteCategory);
router.delete('/:id/hard', hardDeleteCategory);
module.exports = router;