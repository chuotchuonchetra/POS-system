const router = require('express').Router()
const {getAllPayments,getPaymentById,createPayment,updatePayment,deletePayment,checkPaymentStatus} = require('../../controllers/payment.controller')


router.get('/',getAllPayments)
router.get('/status/:orderId',checkPaymentStatus)
router.get('/:id',getPaymentById)
router.post('/:orderId',createPayment)
router.put('/:id',updatePayment)
router.delete('/:id',deletePayment)

module.exports = router