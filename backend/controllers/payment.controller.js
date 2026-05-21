const { Payment, Order, User, OrderDetail, Product } = require("../models");
const {
  getReqTime,
  buildCheckTransactionHash,
  encodeBase64,
  buildPurchaseHash,
} = require("../utils/payway");

const axios = require("axios");

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Order,
          as: "order",
        },
      ],
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          as: "order",
        },
      ],
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createPayment = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderDetail,
          as: "orderDetails",
          include: ["product"],
        },
        { model: User, as: "user" },
      ],
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    let payment = await Payment.findOne({
      where: { orderId, status: "pending" },
    });
    let paywayTranId =
      payment ? payment.paywayTranId : `ORD-${orderId}-${Date.now()}`;

    if (!payment) {
      payment = await Payment.create({
        orderId,
        paywayTranId,
        amount: order.totalAmount,
        currency: "USD",
        status: "pending",
        method: order.paymentMethod,
        paidAt: new Date(),
        rawResponse: {},
        remark: "Payment created",
      });
    }

    // FIX 1: Map items and STRINGIFY before Base64 encoding
    const itemsList = order.orderDetails.map((detail) => ({
      name: detail.product?.name || "Product",
      price: Number(detail.unitPrice).toFixed(2),
      quantity: String(detail.quantity),
    }));
    console.log("item list", itemsList);
    // IMPORTANT: JSON.stringify is required here
    const paywayItems = encodeBase64(itemsList);
    console.log("payway item", paywayItems);
    const reqTime = getReqTime();

    // FIX 2: Create a clean payload object
    const payload = {
      req_time: reqTime,
      merchant_id: process.env.ABA_MERCHANT_ID,
      tran_id: paywayTranId,
      amount: Number(order.totalAmount).toFixed(2),
      items: paywayItems, // Use the base64 string
      shipping: "0.00",
      firstname: (order.user?.name || "Guest").trim(),
      lastname: "Customer",
      email: order.user?.email || "guest@example.com",
      phone: order.user?.phone || "000000000",
      type: "purchase",
      payment_option: "cards",
      currency: "USD",
      payment_gate: "0",
      return_url: process.env.ABA_PAYWAY_CONTINUE_SUCCESS_URL,
      cancel_url: process.env.ABA_PAYWAY_CANCEL_URL,
      continue_success_url: process.env.PAYWAY_CONTINUE_SUCCESS_URL,
      return_deeplink: "",
      custom_fields: "",
      return_params: "",
    };

    // FIX 3: Ensure buildPurchaseHash ONLY uses the 12 fields above
    const hash = buildPurchaseHash(payload);

    // FIX 4: Add the extra fields AFTER the hash is generated
    const finalFields = {
      ...payload,
      hash,
    };

    return res.json({
      success: true,
      message: "Payment initialized",
      data: {
        payment,
        payway: {
          action: process.env.ABA_API_URL,
          method: "POST",
          target: "aba_webservice",
          id: "aba_merchant_request",
          fields: finalFields,
        },
      },
    });
  } catch (error) {
    console.error("ABA Payment Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const checkPaymentStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Include the Order model so you can update it in one flow
    const payment = await Payment.findOne({
      where: { orderId },
      include: [{ model: Order }],
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    // If already completed, don't call PayWay again
    if (payment.status === "completed") {
      return res.json({
        success: true,
        message: "Already paid",
        data: payment,
      });
    }

    const reqTime = getReqTime();
    const payload = {
      req_time: reqTime,
      merchant_id: process.env.ABA_MERCHANT_ID,
      tran_id: payment.paywayTranId,
    };

    // Ensure this function uses your Secret Key + HMAC-SHA512 + Base64
    const checkHash = buildCheckTransactionHash(payload);

    const response = await axios.post(
      process.env.PAYWAY_CHECK_URL,
      { ...payload, hash: checkHash },
      { headers: { "Content-Type": "application/json" } },
    );

    const resData = response.data;

    // ABA returns status 0 for "Success/Approved"
    if (parseInt(resData.status) === 0) {
      // Use a Transaction if possible to ensure both update or both fail
      await payment.update({
        status: "completed",
        paidAt: new Date(),
        rawResponse: JSON.stringify(resData), // Store as string for debugging
      });

      await Order.update({ status: "completed" }, { where: { id: orderId } });

      return res.json({
        success: true,
        message: "Payment success!",
        status: "PAID",
      });
    }

    // If still pending (status 1)
    return res.json({
      success: false,
      message: resData.description || "Payment is still pending.",
      status: "PENDING",
    });
  } catch (error) {
    console.error("PayWay Check Error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ message: "Internal server error during verification" });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    await payment.update(req.body);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    await payment.destroy();
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  checkPaymentStatus,
};
