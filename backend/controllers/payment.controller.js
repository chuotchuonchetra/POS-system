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
// const createPayment = async (req, res) => {
//   const { orderId } = req.params;
//   try {
//     // 1. Fetch order with User and Product details
//     // Note: Ensure your Sequelize associations (User, Product) are correctly defined
//     const order = await Order.findByPk(orderId, {
//       include: [
//         {
//           model: OrderDetail,
//           as: "orderDetails",
//           include: ["product"], // Required for detail.product.name
//         },
//         { model: User, as: "user" }, // Required for order.user.name/email
//       ],
//     });

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // 2. Check for existing pending payment
//     let payment = await Payment.findOne({
//       where: { orderId, status: "pending" },
//     });

//     let paywayTranId;

//     // 3. Create record if it doesn't exist
//     if (!payment) {
//       paywayTranId = `ORD-${orderId}-${Date.now()}`;
//       payment = await Payment.create({
//         orderId,
//         paywayTranId,
//         amount: order.totalAmount,
//         currency: "USD",
//         status: "pending",
//         method: order.paymentMethod,
//         paidAt: new Date(),
//         rawResponse: {},
//         remark: "Payment created",
//       });
//     } else {
//       paywayTranId = payment.paywayTranId;
//     }

//     // 4. Build and Base64 encode the items
//     // ABA requires the items string to be Base64 encoded for the hash and the payload
//     const itemsList = order.orderDetails.map((detail) => ({
//       name: detail.product?.name || "Product",
//       price: Number(detail.unitPrice).toFixed(2),
//       quantity: String(detail.quantity),
//     }));

//     const paywayItems = encodeBase64(itemsList);

//     // 5. Build PayWay payload
//     const reqTime = getReqTime();
//     const payload = {
//       req_time: reqTime,
//       merchant_id: process.env.ABA_MERCHANT_ID, // Matches your .env
//       tran_id: paywayTranId,
//       amount: Number(order.totalAmount).toFixed(2),
//       items: paywayItems,
//       shipping: "0.00",
//       firstname: order.user?.name || "Guest",
//       lastname: "Customer",
//       email: order.user?.email || "guest@example.com",
//       phone: order.user?.phone || "000000000",
//       type: "purchase", // Standard for checkouts
//       payment_option: "abapay_khqr",
//       return_url: process.env.PAYWAY_CONTINUE_SUCCESS_URL,
//       cancel_url: process.env.PAYWAY_CANCEL_URL,
//       continue_success_url: process.env.PAYWAY_CONTINUE_SUCCESS_URL,
//       currency: "USD",
//       payment_gate: 0,
//     };

//     // 6. Generate Hash
//     const hash = buildPurchaseHash(payload);

//     // 7. Final Response
//     return res.json({
//       success: true,
//       message: "Payment initialized",
//       data: {
//         payment,
//         payway: {
//           action: process.env.ABA_API_URL,
//           method: "POST",
//           target: "aba_webservice",
//           id: "aba_merchant_request",
//           fields: {
//             ...payload,
//             hash,
//           },
//         },
//       },
//     });
//   } catch (error) {
//     console.error("ABA Payment Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

const checkPaymentStatus = async (req, res) => {
  const { orderId } = req.params;
  try {
    const payment = await Payment.findOne({
      where: {
        orderId,
      },
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    //1. Create PayWay request for transaction status
    const reqTime = getReqTime();
    const checkTranPayload = {
      req_time: reqTime,
      merchant_id: process.env.ABA_MERCHANT_ID,
      tran_id: payment.paywayTranId, // use the ID from before
    };
    const checkHash = buildCheckTransactionHash(checkTranPayload);
    // 2. Build PayWay request object
    const paywayCheckRequest = {
      ...checkTranPayload,
      hash: checkHash,
    };
    // 3. Send request to PayWay
    const response = await axios.post(
      process.env.PAYWAY_CHECK_URL ||
        "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/check-transaction",
      paywayCheckRequest,
    );
    const resData = response.data;
    // 4. Update payment record based on status
    if (resData.status === 0) {
      // PayWay returns 0 for success/completed in some versions, but let's check resData.status
      // Complete Payment and Order
      await payment.update({
        status: "completed",
        paidAt: new Date(),
        rawResponse: resData,
      });
      await Order.update({ status: "completed" }, { where: { id: orderId } });
      return res.json({
        success: true,
        message: "Payment verified and order completed!",
        data: { status: "APPROVED", payment },
      });
    } else {
      return res.json({
        success: false,
        message: "Payment still pending or failed.",
        data: { status: "PENDING", payment },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check payment status" });
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
