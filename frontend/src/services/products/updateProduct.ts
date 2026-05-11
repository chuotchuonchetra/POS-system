import axios from "axios";
import type { Product } from "../../types/product.type";

export const updateProduct = async (productId: number, payload: Product,fileImage) => {
    const token = localStorage.getItem("token");
    console.log(payload)
    // 1. Create a FormData instance
    const formData = new FormData();

    // 2. Append all text fields from your product object
    formData.append("name", payload.name);
    formData.append("price", payload.price.toString());
    formData.append("description", payload.description || "");
    formData.append("category", payload.category.name.toString());

    // 3. Append the image file
    if (payload.imageUrl) {
        formData.append("image", fileImage); 
    }

    // 4. Send the request
    const res = await axios.put(
        `http://localhost:5000/api/v1/products/${productId}`, 
        formData, 
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
        }
    );
    return res.data;
};