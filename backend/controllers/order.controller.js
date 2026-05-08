
const {Order,OrderDetail,User,Product,Category} = require('../models')

const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.findAll({
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
                            attributes: ['name','price','discount'],
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
            data:orders,
            message:"All orders fetched successfully"
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
    console.log("Body received:", req.body);
    try {
        const {userId,totalAmount,paymentMethod,items} = req.body
        
         for(let item of items){
            const product = await Product.findOne({
                where:{id:item.productId,isActive:true}
            })
            if(!product){
                return res.status(404).json({message:'Product not found'})
            }    
        }4


        const order = await Order.create({
            userId,
            totalAmount,
            status: 'pending',
            paymentMethod
        })

        //create order details + decrement stock 
        for (const item of items){
            const orderDetail = await OrderDetail.create({
                orderId:order.id,
                productId:item.productId,
                quantity:item.quantity,
                unitPrice:item.unitPrice
            })
            //decrement stock
            // await Product.update({
            //     stock:Product.stock - item.quantity
            // },{where:{id:item.productId}})
            await Product.decrement('stock',{
                by:item.quantity,
                where:{id:item.productId}
            })
        }
        res.status(200).json({
            data: order,
            message: 'Order created successfully'
        })
    } catch (error) {
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

const deleteOrder = async (req,res)=>{
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
    deleteOrder

}   