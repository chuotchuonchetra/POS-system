import axios from "axios";

export const createProduct = async (product: any) => {
    try {
        const res = await axios.post("http://localhost:5000/api/v1/products", product);
        return res.data;
    } catch (error) {
        console.error("Error creating product:", error);
    }
}