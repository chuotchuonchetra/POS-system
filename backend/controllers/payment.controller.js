const { getReqTime } = require('../migrations/20260507043458-create-order-detail')
const { Payment, Order ,User,OrderDetail,Product} = require('../models')


const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: [
                {
                    model: Order,
                    as: 'order'
                }
            ]
        })
        res.status(200).json(payments)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id, {
            include: [
                {
                    model: Order,
                    as: 'order'
                }
            ]
        })
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' })
        }
        res.status(200).json(payment)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createPayment = async (req, res) => {
    const { orderId } = req.params
    try {
        //fetch order
        const order = await Order.findByPk(orderId,{
            include:[
                {model:User,as:'user'},
                {model:OrderDetail,as:'orderDetails'}
            ]
        })
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
        

        // prevent duplicate payment order
        let payment = await Payment.findOne({
            where:{
                orderId,
                status:'pending'
            }
        })
        let paywayTranId;
        //3. create payment record
        
        if(!payment){
            paywayTranId = `ORD-${orderId}-${Date.now()}`
            payment = await Payment.create({
                orderId,
                paywayTranId,
                amount: order.totalAmount,
                currency: 'USD',
                status: 'pending',
                method:order.paymentMethod,
                paidAt:new Date(),
                rawResponse:{},
                remark: 'Payment created'
            })
            return res.status(200).json({
                message: 'Payment Created Successfully',
                payment,
                
            })
        }else{
            paywayTranId = payment.paywayTranId
        }

        //4. Build payway payload 
        const reqTime = getReqTime()
        let paywayItems = JSON.stringify(
            order.orderDetails.map(detail=> ({
                name:detail.product.name,
                price:detail.unitPrice,
                quantity:detail.quantity
            }))
        )

        const payload = {
            req_time: reqTime,
            merchant_id: process.env.PAYWAY_MERCHANT_ID,
            tran_id: paywayTranId,
            amount: order.totalAmount,
            items: paywayItems,
            shipping: 0,
            firstname: order.user.name,
            lastname: '',
            email: order.user.email,
            phone: order.user.phone,
            type: 'payment',
            payment_option: 'card',
            return_url: process.env.PAYWAY_RETURN_URL,
            cancel_url: process.env.PAYWAY_CANCEL_URL,
            continue_success_url: process.env.PAYWAY_CONTINUE_SUCCESS_URL,
            currency: 'USD'
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id)
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' })
        }
        await payment.update(req.body)
        res.status(200).json(payment)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id)
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' })
        }
        await payment.destroy()
        res.status(200).json({ message: 'Payment deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}