import type { Product } from "../../types/product.type";
import { api } from "../../lib/api";

export const createProduct = async (product: Product, fileImage: File | null) => {
    try {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price.toString());
        formData.append("stock", product.stock.toString());
        formData.append("categoryId", product.categoryId?.toString() ?? "");
        formData.append("description", product.description ?? "");
        if (fileImage) {
            formData.append("image", fileImage);
        }
        const res = await api.post("/products", formData);
        return res.data;
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false };
    }
}
