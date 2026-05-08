import { Minus, Plus, Trash } from "phosphor-react"
import type { Product } from "../../../types/product.type"


interface Props{
    cart:Product[]
    onQuantityChange: (productId: number, quantity: number) => void
}

export const Checkout = ({cart,onQuantityChange}:Props) => {
    
    
    return(
            <div className="flex flex-col  h-screen w-98 bg-white border-s border-gray-100 relative">
                <h1 className="text-xl font-medium border-b  border-gray-100 py-6 ps-4">Cart</h1>
                <div id="cart" className="p-4 space-y-4">
                    {cart.map((p:Product) => (
                        <div key={p.id} className="flex gap-2 border rounded-2xl pe-2 relative">
                            <div className=" ">
                                <img src={p.imageUrl} alt="" className="w-20 rounded-2xl  h-20 m-3" />      
                            </div>
                            <div className="flex-2">
                                <h1>{p.name}</h1>
                                <p className="text-gray-500 text-xs truncate w-48">{p.description}</p>
                                <h1 className="font-bold">${p.price}</h1>
                                <div className="flex items-center gap-4 absolute  bottom-3">
                                <button 
                                onClick={()=> onQuantityChange(p.id, p.quantity > 1 ? p.quantity - 1 : p.quantity)}
                                className="bg-white shadow-sm cursor-pointer text-gray-900 p-1 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                                    <Minus size={16}/>
                                </button>
                                <span className="font-bold">{p.quantity}</span>
                                <button 
                                onClick={()=> onQuantityChange(p.id, p.quantity + 1)}
                                className="bg-gray-900 shadow-sm cursor-pointer text-white p-1 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                                    <Plus size={16}/>
                                </button>
                            </div>
                            <div className="absolute inset-e-3 bottom-3">      
                                <Trash size={24} className="cursor-pointer text-red-700"/>
                            </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p>Detail Payment</p>
                    <p>Subtotal ${cart.reduce((total,item) => total + item.price * item.quantity,0)}</p>
                    <p>Tax ${cart.reduce((total,item) => total + item.price * 0.10,0)}</p>
                    <p>Total Payment </p>
                    <button className="">Pay Now</button>
                </div>
            </div>
    )
}   