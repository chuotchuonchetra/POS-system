const db = require('../models');
const {User} = db;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required",
                success:false
            })
        }
        const user = await User.findOne({where:{email}});
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success:false
            })
        }
        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid credentials",
                success:false
            })
        }
        const token = jwt.sign({id:user.id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({
            message: "User logged in successfully",
            success:true,
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}
const register = async(req,res)=>{
    try {
        const {name,email,password,role} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success:false
            })
        }
        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
                success:false
            })
        }
        const validateRoles = ['admin','cashier','owner']
        if(!validateRoles.includes(role)){
            return res.status(400).json({
                message: "Invalid role",
                success:false
            })
        }
        //hash password 
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role,
            isActive:true
        });
        res.status(201).json({
            message: "User created successfully",
            success:true,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}
module.exports = {
    login,
    register
}