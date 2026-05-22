const router = require("express").Router();
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  checkPaymentStatus,
} = require("../../controllers/payment.controller");

// Static routes / exact matches first
router.get("/", getAllPayments);
router.post("/status/:orderId", checkPaymentStatus);

// Wildcard / dynamic routes last
router.post("/:orderId", createPayment);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
