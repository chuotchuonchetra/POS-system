const router =  require("express").Router()
const {getAllOrders,getOrderById,createOrder,updateOrder,softDeleteOrder,hardDeleteOrder} = require("../../controllers/order.controller")

router.get("/",getAllOrders)
router.get("/:id",getOrderById)
router.post("/",createOrder)
router.put("/:id",updateOrder)
router.delete("/:id",softDeleteOrder)
router.delete("/:id/hard",hardDeleteOrder)

module.exports = router