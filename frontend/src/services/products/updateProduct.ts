import type { Product } from "../../types/product.type";
import { api } from "../../lib/api";

export const updateProduct = async (productId: number, payload: Product, fileImage: File | null) => {
    // 1. Create a FormData instance
    const formData = new FormData();

    // 2. Append all text fields from your product object
    formData.append("name", payload.name);
    formData.append("price", payload.price.toString());
    formData.append("stock", payload.stock.toString());
    formData.append("description", payload.description || "");
    formData.append("categoryId", payload.categoryId?.toString() ?? "");

    // 3. Append the image file
    if (fileImage) {
        formData.append("image", fileImage); 
    }

    // 4. Send the request
    const res = await api.put(`/products/${productId}`, formData);
    return res.data;
};
