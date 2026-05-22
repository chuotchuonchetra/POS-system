import { api } from "../../lib/api";

export const softDeleteProduct = async (id: number) => {
  const res = await api.delete(`/products:${id}`);
  return res.data;
};
