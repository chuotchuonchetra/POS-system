import { api } from "../../lib/api";

export const checkPaymentStatus = async (orderId: number) => {
  const res = await api.post(`/payment/status/${orderId}`);

  return res.data;
};
