interface Props{
    cart:Product[]
}
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
export const Checkout = ({cart}:Props) => {
    return(
            <div className="h-screen w-80 bg-white border-s border-gray-100 p-4">
                <h1 className="text-xl font-medium border-b border-gray-100 pb-4">Cart</h1>
                <div id="cart">
                    {cart.map((p:Product) => (
                        <div>
                            <p>{p.name}</p>
                            <p>{p.price}</p>
                            <p>{p.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
    )
}   