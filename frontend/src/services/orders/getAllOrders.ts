import { api } from "../../lib/api";


export const getAllOrders = async (page: number, limit: number) => {
    const res = await api.get(`/orders?page=${page}&limit=${limit}`);
    return res.data;
}   