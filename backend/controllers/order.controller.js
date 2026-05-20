
const {Order,OrderDetail,User,Product,Category,sequelize} = require('../models')

const getAllOrders = async (req,res)=>{
    let {page,limit} = req.query;
    page = parseInt(page) ;
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    try {
        const orders = await Order.findAndCountAll({
            limit:limit,
            offset:offset,
            distinct:true,
            order:[
                ['id','ASC']
            ],
            include:[
                {
                    model:User,
                    as:'user',
                    attributes:['name','role']
                },
                {
                    model:OrderDetail,
                    as:'orderDetails',
                    attributes:['id','quantity','unitPrice','productId'],
                    include:[
                        {
                            model:Product,
                            as:'product',
                            attributes: ['name','price','discount','imageUrl'],
                            include:[
                                {
                                    model:Category,
                                    as:'category',
                                    attributes: ['name']
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        return res.status(200).json({
            success:true,
            data:orders.rows,
            message:"All orders fetched successfully",
            pagination:{
                page:page,
                limit:limit,
                total:orders.count,
                totalPages:Math.ceil(orders.count/limit)
            }
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
const getOrderById = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findByPk(id,{
            include:[
                {
                    model:User,
                    as:'user',
                    attributes:['name']
                },
                {
                    model:OrderDetail,
                    as:'orderDetails',
                    attributes:['id','quantity','unitPrice','productId']
                }
            ]
        })
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        res.status(200).json(order)
    } catch (error) {

        
        res.status(500).json({ message: error.message })
    }
}
 
const createOrder = async (req,res)=>{
    const transaction = await sequelize.transaction();
    try {
        const {userId,totalAmount,paymentMethod,items} = req.body

        if (!userId || !paymentMethod || !Array.isArray(items) || items.length === 0) {
            await transaction.rollback();
            return res.status(400).json({message:'userId, paymentMethod, and items are required'})
        }

        for(let item of items){
            if (!item.productId || !item.quantity || item.quantity < 1 || !item.unitPrice) {
                await transaction.rollback();
                return res.status(400).json({message:'Each item requires productId, quantity, and unitPrice'})
            }
            const product = await Product.findOne({
                where:{id:item.productId,isActive:true},
                transaction
            })
            if(!product){
                await transaction.rollback();
                return res.status(404).json({message:'Product not found'})
            }
            if (product.stock < item.quantity) {
                await transaction.rollback();
                return res.status(400).json({message:`Insufficient stock for ${product.name}`})
            }
        }


        const order = await Order.create({
            userId,
            totalAmount,
            status: 'pending',
            paymentMethod
        }, { transaction })
        
        //create order details + decrement stock 
        for (const item of items){
            await OrderDetail.create({
                orderId:order.id,
                productId:item.productId,
                quantity:item.quantity,
                unitPrice:item.unitPrice
            }, { transaction })
            //decrement stock
            await Product.decrement('stock',{
                by:item.quantity,
                where:{id:item.productId},
                transaction
            })
        }
        await transaction.commit();
        res.status(200).json({
            success:true,
            data: order,
            message: 'Order created successfully'
        })
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message })
    }
}

const updateOrder = async (req,res)=>{
    try {

        const {userId,totalAmount,status,paymentMethod} = req.body
        const order = await Order.update({
            userId,
            totalAmount,
            status,
            paymentMethod
        },{
            where:{
                id:req.params.id
            }
        })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const hardDeleteOrder = async (req,res)=>{
    try {
        const order = await Order.destroy({
            where:{
                id:req.params.id
            }
        })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const softDeleteOrder = async (req,res)=>{
    try {
        const order = await Order.update({
            status:'deleted'
        },{
            where:{
                id:req.params.id
            }
        })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}  

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    hardDeleteOrder,
    softDeleteOrder
}   
