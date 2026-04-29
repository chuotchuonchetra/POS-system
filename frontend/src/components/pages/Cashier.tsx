import { Checkout } from "./cashier-components/Checkout"
import { ProductList } from "./cashier-components/ProductList"
import { SearchBar } from "./cashier-components/SearchBar"

export const CashierPage = ()=>{
    return (
        <div className="flex h-screen w-full">
            <div className="w-full flex-1 ">
                <SearchBar/>
                <div className="overflow-y-auto h-[calc(100vh-120px)] ">
                    <ProductList/>
                </div>
            </div>
           <div className="">
             <Checkout />
           </div>   
        </div>
    )
}