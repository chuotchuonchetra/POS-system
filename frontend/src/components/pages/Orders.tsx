export  const data = [
{
  "id": "TRX-9842",
  "timestamp": "2024-05-20T14:22:00Z",
  "items": [
    { "name": "Oat Milk Latte", "qty": 2, "price": 11.00 },
    { "name": "Avocado Sourdough", "qty": 1, "price": 12.00 }
  ],
  "total": 23.00,
  "paymentMethod": "Credit Card",
  "status": "Completed"
},
{
  "id": "TRX-9843",
  "timestamp": "2024-05-20T14:45:00Z",
  "items": [
    { "name": "Espresso Roast (250g)", "qty": 1, "price": 18.50 }
  ],
  "total": 18.50,
  "paymentMethod": "Apple Pay",
  "status": "Completed"
},
{
  "id": "TRX-9844",
  "timestamp": "2024-05-20T15:10:00Z",
  "items": [
    { "name": "Ceramic Pour-over Kit", "qty": 1, "price": 45.00 }
  ],
  "total": 45.00,
  "paymentMethod": "Cash",
  "status": "Refunded"
}
]
export const OrderPage = ()=>{
    return (
      
        <div className="flex h-screen">
                <div className="flex-1 flex flex-col">
                    <main className="flex-1">
                        <h1>Orders</h1>
                    </main>
                </div>
                <div className="w-80 border-l border-gray-100 bg-white">
                    <h1>Cart</h1>
                </div>
        </div>
    )
}