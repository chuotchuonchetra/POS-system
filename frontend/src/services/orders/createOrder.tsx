import { api } from "../../lib/api";

const createOrder = async (order: any) => {
    const res = await api.post("/orders", order);
    return res.data;
}

export default createOrder;