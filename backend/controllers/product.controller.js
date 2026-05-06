 const { where } = require("sequelize");
const db = require("../models");
 const { Product,Category } = db;
const getAllProducts = async(req,res)=>{
    const {categoryId} = req.query;
    try {
        const products = await Product.findAll({
            where: categoryId ? { categoryId } : {},
            include:[
                {
                    model:Category,
                    as:'category',
                    attributes:['name']
                }
            ]
        });
        res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const createProduct = async(req,res)=>{
    try {
        const {name,price,stock,categoryId,description} = req.body;
        const image_url = req.file ? req.file.path : null;
        if(!name || !price || !stock || !categoryId || !image_url){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const product = await Product.create({
            name,
            price,
            stock,
            categoryId,
            image_url,
            description
        });
        res.status(201).json({
            success:true,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,price,stock,categoryId,description} = req.body;
        const image_url = req.file ? req.file.path : null;

        const product = await Product.update({
            name,
            price,
            stock,
            categoryId,
            image_url,
            description
        },{where:{id}});
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const softDeleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.update({
            isActive:false
        },{where:{id}});
        res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const hardDeleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.destroy({where:{id}});
        res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    softDeleteProduct,
    hardDeleteProduct
}