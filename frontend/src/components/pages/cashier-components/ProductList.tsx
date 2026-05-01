import axios from "axios";
import { CheckCircle, Minus, Plus } from "phosphor-react";
import { useEffect, useState } from "react";

// const products = [
//   // DRINKS
//   { id:1, name:'Iced Americano', price:2.5, stock:32, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f5f0e8' },
//   { id:2, name:'Cappuccino', price:3.0, stock:18, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f5f0e8' },
//   { id:3, name:'Latte', price:3.2, stock:20, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf4e7' },
//   { id:4, name:'Matcha Latte', price:3.5, stock:6, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f0fdf4' },
//   { id:5, name:'Thai Milk Tea', price:2.8, stock:12, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf4e7' },
//   // { id:6, name:'Fresh Coconut', price:2.0, stock:10, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#ecfdf5' },
//   // { id:7, name:'Lemon Soda', price:1.8, stock:14, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fefce8' },

//   // FOOD
//   { id:8, name:'Pad Thai', price:5.5, stock:15, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f0fdf4' },
//   { id:9, name:'Fried Rice Chicken', price:4.8, stock:11, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fff7ed' },
//   { id:10, name:'Beef Noodle Soup', price:6.0, stock:7, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fff1f2' },
//   { id:11, name:'Grilled Pork Rice', price:5.0, stock:9, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fef3c7' },
//   // { id:12, name:'Chicken Burger', price:4.5, stock:13, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fef9c3' },
//   // { id:13, name:'French Fries', price:2.2, stock:25, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fefce8' },

//   // SNACKS
//   { id:14, name:'Potato Chips', price:1.5, stock:4, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fef9c3' },
//   { id:15, name:'Chocolate Bar', price:1.2, stock:20, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f5f0e8' },
//   { id:16, name:'Mixed Nuts', price:2.5, stock:16, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf4e7' },
//   // { id:17, name:'Ice Cream Cup', price:2.8, stock:8, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf2f8' },
//   // { id:18, name:'Donut', price:1.7, stock:10, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf2f8' },
// ];
interface Product{
  id:number
  name:string
  price:number
  stock:number
  cat:string
  image_url:string
  color:string
  quantity?:number
}

export const ProductList = ({onAddToCart}) => {

  const [products,setProducts] = useState<Product[]>([])
  useEffect(()=>{
    const fetchProducts = async()=>{
      const response = await axios.get('http://localhost:5000/api/v1/products');
      setProducts(response.data.products);
    }
    fetchProducts();
  },[])
  console.log(products)
  const [cart,setCart] = useState<Product[]>([])
  const [productAdded,setProductAdded] = useState(null)
  const [productQty,setProductQty] = useState(1)
  const handleAddToCart = (product:Product)=>{
    setCart([...cart,product])
    onAddToCart(cart)
  }
  console.log(cart)
  const handleProductQty = (action:string)=>{
    if(action === 'increment'){
      setProductQty((prev) => prev + 1)
    }else if(action === 'decrement'){
      if(productQty === 1){
        setProductQty(1)
        return;
      }
      setProductQty((prev) => prev - 1)
    }
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products?.map((p) => {
      
          return (
            <div className="card p-3   border border-gray-200 rounded-2xl " key={p.id}>
              <div id="img">
                <img src={p.image_url} alt={p.name} className="w-full rounded-xl" />
              </div>
              <div className="flex gap-1 mt-2">
                <div id="name" className="font-medium ">{p.name}</div>
                <div id="price" className="font-medium text-gray-400">(${p.price})</div>
              </div>
              <div className="mt-2">
                <button 
                onClick={()=>{

                  handleAddToCart(p)
          
                }}
                className={`${productAdded === p.id ? 'hidden' : 'block'} bg-black text-white w-full py-1.5 rounded-xl text-sm font-medium mt-3`}>
                  Add to Cart +
                </button>

                {productAdded === p.id ? (
                  <div className="grid grid-cols-2 gap-2  mt-3">
                    <button className="bg-blue-600 text-white  rounded-2xl flex justify-center items-center gap-1">
                      Choose <CheckCircle size={20}/>
                    </button>
                    <div className="flex justify-center items-center gap-3 bg-gray-200 text-black w-full py-0.5 rounded-2xl text-sm font-medium ">
                      <button 
                      onClick={()=> handleProductQty('decrement')}
                      className="bg-gray-300 text-gray-500 cursor-pointer p-1 rounded-full"><Minus size={20}/></button>
                      <div className="text-xl">{productQty}</div>
                      <button 
                      
                        onClick={()=> handleProductQty('increment')}
                      className="bg-gray-300 text-gray-500 cursor-pointer p-1 rounded-full"><Plus size={20}/></button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};




