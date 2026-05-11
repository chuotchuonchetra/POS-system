import axios from "axios";

// export const getAllProducts = async (page:number,limit:number,setProducts:Function,setTotalPages:Function) => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/v1/products/filtered", {
//         params: { page, limit }
//       });
//       setProducts(res.data.products);
//       setTotalPages(res.data.pagination.totalPages);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

export const getAllProducts = async(page:number,limit:number,)=>{
  try{
    console.log("page",page)
    console.log("limit",limit)
    const res = await axios.get("http://localhost:5000/api/v1/products/filtered",{
      params:{page,limit}
    });
    return res.data;
  }catch(error){
    console.error("Error fetching products:", error);
  }
}