const router =  require("express").Router()
const {getAllOrders,getOrderById,createOrder,updateOrder,deleteOrder} = require("../../controllers/order.controller")

router.get("/",getAllOrders)
router.get("/:id",getOrderById)
router.post("/",createOrder)
router.put("/:id",updateOrder)
router.delete("/:id",deleteOrder)

module.exports = router