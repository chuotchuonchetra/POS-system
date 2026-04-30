import { useState } from "react"
import { Checkout } from "./cashier-components/Checkout"
import { ProductList } from "./cashier-components/ProductList"
import { SearchBar } from "./cashier-components/SearchBar"

interface Product{
  id:number
  name:string
  price:number
  stock:number
  cat:string
  imageUrl:string
  color:string
  quantity?:number
}
export const CashierPage = ()=>{
  const [cart,setCart] = useState<Product[]>([])
  const handleCart = (product:Product[])=>{
    setCart([...cart, ...product])
  }
  console.log(cart)
    return (
        <div className="flex h-screen w-full">
            <div className="w-full flex-1 ">
                <SearchBar/>
                <div className="overflow-y-auto h-[calc(100vh-120px)] ">
                    <ProductList onAddToCart={handleCart} />
                </div>
            </div>
           <div className="">
             <Checkout cart={[]}/>
           </div>   
        </div>
    )
}