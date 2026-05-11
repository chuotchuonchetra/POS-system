const router =  require("express").Router()
const {getAllOrders,getOrderById,createOrder,updateOrder,softDeleteOrder,hardDeleteOrder} = require("../../controllers/order.controller")
const { authMiddleware, roleMiddleware } = require("../middlewares/auth.middleware")

router.get("/", authMiddleware, getAllOrders)
router.get("/:id", authMiddleware, getOrderById)
router.post("/", authMiddleware, roleMiddleware(["admin", "owner", "cashier"]), createOrder)
router.put("/:id", authMiddleware, roleMiddleware(["admin", "owner"]), updateOrder)
router.delete("/:id", authMiddleware, roleMiddleware(["admin", "owner"]), softDeleteOrder)
router.delete("/:id/hard", authMiddleware, roleMiddleware(["admin", "owner"]), hardDeleteOrder)

module.exports = router
