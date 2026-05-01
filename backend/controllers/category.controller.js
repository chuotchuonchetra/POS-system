
const db = require('../models');
const {Category, Product} = db;

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: db.Product,
                    as: 'products',
                    attributes: ['id', 'name', 'price', 'stock', 'image_url']
                }
            ]
        })
        res.status(200).json({
            success: true,
            data: categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const createCategory = async (req,res)=>{
    try {
        const {name,isActive} = req.body;
        if(!name){
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            })
        }
        const category = await Category.create({name,isActive});
        res.status(200).json({
            success: true,
            data: category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const updateCategory = async (req,res)=>{
    try {
        const {id} = req.params;
        const {name,isActive} = req.body;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Category id is required"
            })
        }
        const category = await Category.update({name,isActive},{where:{id}});
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const softDeleteCategory = async (req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Category id is required"
            })
        }
        const category = await Category.update({isActive:false},{where:{id}});
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const hardDeleteCategory = async (req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Category id is required"
            })
        }
        const category = await Category.destroy({where:{id}});
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    softDeleteCategory,
    hardDeleteCategory
}