import { api } from "../../lib/api";


export const getAllProducts = async(page:number,limit:number,)=>{
  try{
    const res = await api.get("/products/filtered",{
      params:{page,limit}
    });
    return res.data;
  }catch(error){
    console.error("Error fetching products:", error);
    return { products: [], pagination: { totalPages: 0 } };
  }
}
