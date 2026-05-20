const crypto = require("crypto");

function getReqTime() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  return (
    d.getFullYear() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function signPayWay(raw) {
  return crypto
    .createHmac("sha512", process.env.ABA_PAYWAY_API_KEY)
    .update(raw)
    .digest("base64");
}

function buildPurchaseHash(payload) {
  const raw =
    String(payload.req_time || "") +
    String(payload.merchant_id || "") +
    String(payload.tran_id || "") +
    String(payload.amount || "") +
    String(payload.items || "") +
    String(payload.shipping || "") +
    String(payload.ctid || "") +
    String(payload.pwt || "") +
    String(payload.firstname || "") +
    String(payload.lastname || "") +
    String(payload.email || "") +
    String(payload.phone || "") +
    String(payload.type || "") +
    String(payload.payment_option || "") +
    String(payload.return_url || "") +
    String(payload.cancel_url || "") +
    String(payload.continue_success_url || "") +
    String(payload.return_deeplink || "") +
    String(payload.currency || "") +
    String(payload.custom_fields || "") +
    String(payload.return_params || "");

  const hash = crypto
    .createHmac("sha512", process.env.ABA_PAYWAY_API_KEY.trim())
    .update(raw)
    .digest("base64");

  console.log("\n========== ABA HASH ==========");
  console.log(hash);

  return hash;
}

function buildCheckTransactionHash({ req_time, merchant_id, tran_id }) {
  const raw = req_time + merchant_id + tran_id;
  return signPayWay(raw);
}
const encodeBase64 = (data) => {
  return Buffer.from(JSON.stringify(data)).toString("base64");
};

module.exports = {
  getReqTime,
  buildPurchaseHash,
  encodeBase64,
  buildCheckTransactionHash,
};
