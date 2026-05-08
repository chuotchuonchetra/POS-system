import axios from "axios"
import { useEffect,useState } from "react"

const ProductPage = ()=>{
    const [products,setProducts] = useState([]);
    const [totalPages,setTotalPages] = useState(0);
    // const [loading,setLoading] = useState(false);
    const [limit,setLimit] = useState(10);
  const [page,setPage] = useState(1);
    useEffect(()=>{
        getAllProducts()
    },[page,limit])
    const getAllProducts = async () =>{
        // setLoading(true);   
        const res = await axios.get("http://localhost:5000/api/v1/products/filtered",{
            params:{
                page:page,
                limit:limit
            }
        })
        setProducts(res.data.products)
        setTotalPages(res.data.pagination.totalPages)
        
        // setLoading(false);
    }
    return (
        <div>
             
               <div className="m-5">
                 <div className="flex flex-col items-center">
                    <div className="flex justify-end items-end mt-6">
                   <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
                   </div>
                   <table className=" w-full">
                    <thead className="border">
                        <tr className="h-10">
                            <th className="border border-gray-200 text-center">Image</th>
                            <th className="border border-gray-200 text-center ">ID</th>
                            <th className="border border-gray-200 text-center">Name</th>
                            <th className="border border-gray-200 text-center">Price</th>
                            <th className="border border-gray-200 text-center">Discount</th>
                            <th className="border border-gray-200 text-center">Stock</th>
                            <th className="border border-gray-200 text-center">Category</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {products.map((product) => (
                            <tr key={product.id} className="border border-gray-200">
                                <td className="p-1 border border-gray-200"><img src={product.imageUrl} alt="" className="w-16 h-16 object-cover rounded" /></td>
                                <td className="p-1 text-center border border-gray-200">{product.id}</td>
                                <td className="p-1 text-center border border-gray-200">{product.name}</td>
                                <td className="p-1 text-center border border-gray-200">{product.price}</td>
                                <td className="p-1 text-center border border-gray-200">{product.discount}</td>
                                <td className="p-1 text-center border border-gray-200">{product.stock}</td>
                                <td className="p-1 text-center border border-gray-200">{product.category?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                   </table>
                   <div className="flex justify-between items-center w-full mt-2">
                    <button
                        disabled={page === 1}
                        className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={()=>setPage(page-1)}>
                        Previous
                    </button>
                    <p>{page} / {totalPages}</p>
                    <button
                        disabled={page === totalPages}
                        className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={()=>setPage(page+1)}
                        >Next
                    </button>
                   </div>
                   </div>
                   </div>
               
             
        </div>
    )
}

export default ProductPage  