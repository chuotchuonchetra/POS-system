'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const axios = require('axios');
const { Payment, Order } = require('../../models');

// ─── ENV ────────────────────────────────────────────────────────────────────────
const {
  PAYWAY_API_KEY,
  ABA_MERCHANT_ID,
  ABA_API_URL,
  PAYWAY_CHECK_URL,
  PAYWAY_CONTINUE_SUCCESS_URL,
  PAYWAY_CANCEL_URL,
} = process.env;

// ─── HMAC-SHA512 hash as required by ABA PayWay ─────────────────────────────────
function generateHash(fields) {
  // ABA requires: HMAC-SHA512 of concatenated fields, base64-encoded
  const str = fields.join('');
  return crypto
    .createHmac('sha512', PAYWAY_API_KEY)
    .update(str)
    .digest('base64');
}

function generateTranId() {
  // ABA tran_id: alphanumeric, max 20 chars
  return `TXN${Date.now()}`.slice(0, 20);
}

// ─── POST /api/payments/initiate ─────────────────────────────────────────────────
// Called by frontend when user clicks "Pay"
// Creates an Order + pending Payment, then calls ABA to get QR
router.post('/initiate', async (req, res) => {
  const { userId, items, totalAmount, currency = 'USD' } = req.body;

  if (!items || !items.length || !totalAmount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Create Order (status: pending)
    const order = await Order.create({
      userId: userId || null,
      totalAmount,
      status: 'pending',
      paymentMethod: 'abapay',
    });

    // 2. Generate transaction ID
    const tranId = generateTranId();
    const amount = parseFloat(totalAmount).toFixed(2);

    // 3. Build hash fields — ABA order matters:
    //    merchant_id + tran_id + amount + firstname + phone + email + currency
    const firstname = req.body.firstname || 'Customer';
    const phone     = req.body.phone    || '0000000000';
    const email     = req.body.email    || 'customer@pos.com';

    const hash = generateHash([
      ABA_MERCHANT_ID,
      tranId,
      amount,
      firstname,
      phone,
      email,
      currency,
    ]);

    // 4. Build ABA payload
    const abaPayload = {
      merchant_id:    ABA_MERCHANT_ID,
      tran_id:        tranId,
      amount,
      firstname,
      phone,
      email,
      currency,
      return_url:     PAYWAY_CONTINUE_SUCCESS_URL,
      cancel_url:     PAYWAY_CANCEL_URL,
      payment_option: 'abapay',     // shows ABA QR
      hash,
      items: items.map(i => ({
        name:     i.name,
        quantity: i.qty,
        price:    parseFloat(i.price).toFixed(2),
      })),
    };

    // 5. Call ABA PayWay API
    const abaRes = await axios.post(ABA_API_URL, abaPayload, {
      headers: { 'Content-Type': 'application/json' },
    });

    const abaData = abaRes.data;

    // 6. Create pending Payment record
    await Payment.create({
      orderId:       order.id,
      paywayTranId:  tranId,
      method:        'abapay',
      status:        'pending',
      amount:        totalAmount,
      currency,
      rawResponse:   abaData,
    });

    // 7. Return QR & checkout info to frontend
    return res.json({
      success:     true,
      orderId:     order.id,
      tranId,
      amount,
      // ABA returns these fields:
      checkoutUrl: abaData.checkout_url || null,
      qrCode:      abaData.qr           || null,   // base64 PNG QR
      deeplink:    abaData.deeplink      || null,
      abapayDeep:  abaData.abapay_deeplink || null,
      rawResponse: abaData,
    });

  } catch (err) {
    console.error('[PayWay] initiate error:', err?.response?.data || err.message);
    return res.status(500).json({
      error: 'Failed to initiate payment',
      detail: err?.response?.data || err.message,
    });
  }
});

// ─── POST /api/payments/check ─────────────────────────────────────────────────────
// Poll this from frontend to verify payment completion
router.post('/check', async (req, res) => {
  const { tranId, orderId } = req.body;

  if (!tranId) return res.status(400).json({ error: 'tranId required' });

  try {
    const amount = req.body.amount;

    // Hash for check: merchant_id + tran_id + amount
    const hash = generateHash([ABA_MERCHANT_ID, tranId, parseFloat(amount).toFixed(2)]);

    const checkRes = await axios.post(PAYWAY_CHECK_URL, {
      merchant_id: ABA_MERCHANT_ID,
      tran_id:     tranId,
      hash,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = checkRes.data;
    // ABA status: 0 = success, others = pending/failed
    const paid = data.status === 0 || data.apv; 

    if (paid && orderId) {
      // Update Payment record
      await Payment.update(
        { status: 'completed', paidAt: new Date(), rawResponse: data },
        { where: { paywayTranId: tranId } }
      );
      // Update Order status
      await Order.update(
        { status: 'completed' },
        { where: { id: orderId } }
      );
    }

    return res.json({
      success: true,
      paid,
      status: data.status,
      apv:    data.apv || null,
      raw:    data,
    });

  } catch (err) {
    console.error('[PayWay] check error:', err?.response?.data || err.message);
    return res.status(500).json({
      error: 'Failed to check transaction',
      detail: err?.response?.data || err.message,
    });
  }
});

// ─── POST /api/payments/webhook ──────────────────────────────────────────────────
// ABA calls this after payment (return_url / server-side notification)
router.post('/webhook', async (req, res) => {
  const { tran_id, status, apv, hash } = req.body;

  // In production: verify hash here before trusting the data
  console.log('[PayWay] webhook received:', req.body);

  try {
    if (status === '0' || apv) {
      await Payment.update(
        { status: 'completed', paidAt: new Date(), rawResponse: req.body },
        { where: { paywayTranId: tran_id } }
      );
      const payment = await Payment.findOne({ where: { paywayTranId: tran_id } });
      if (payment) {
        await Order.update({ status: 'completed' }, { where: { id: payment.orderId } });
      }
    }
    return res.json({ success: true });
  } catch (err) {
    console.error('[PayWay] webhook error:', err.message);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;