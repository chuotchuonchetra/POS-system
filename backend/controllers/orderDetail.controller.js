//order detail controller

const {OrderDetail,Product,Order} = require('../models');

const createOrderDetail = async (req,res)=>{
    try {
        const {orderId,productId,quantity,unitPrice} = req.body;
        const orderDetail = await OrderDetail.create({
            orderId,
            productId,
            quantity,
            unitPrice
        });
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllOrderDetails = async (req,res)=>{
    try {
        const orderDetails = await OrderDetail.findAll({
            include:[
                {
                    model:Product,
                    as:'product'
                },
                {
                    model:Order,
                    as:'order'
                }
            ]
        });
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderDetailById = async (req,res)=>{
    try {
        const orderDetail = await OrderDetail.findByPk(req.params.id);
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrderDetail = async (req,res)=>{
    try {
        const orderDetail = await OrderDetail.update(req.body,{where:{id:req.params.id}});
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOrderDetail = async (req,res)=>{
    try {
        const orderDetail = await OrderDetail.destroy({where:{id:req.params.id}});
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
