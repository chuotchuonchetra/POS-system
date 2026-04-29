const products = [
  // DRINKS
  { id:1, name:'Iced Americano', price:2.5, stock:32, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f5f0e8' },
  { id:2, name:'Cappuccino', price:3.0, stock:18, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f5f0e8' },
  { id:3, name:'Latte', price:3.2, stock:20, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf4e7' },
  { id:4, name:'Matcha Latte', price:3.5, stock:6, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f0fdf4' },
  { id:5, name:'Thai Milk Tea', price:2.8, stock:12, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf4e7' },
  { id:6, name:'Fresh Coconut', price:2.0, stock:10, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#ecfdf5' },
  { id:7, name:'Lemon Soda', price:1.8, stock:14, cat:'drinks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fefce8' },

  // FOOD
  { id:8, name:'Pad Thai', price:5.5, stock:15, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f0fdf4' },
  { id:9, name:'Fried Rice Chicken', price:4.8, stock:11, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fff7ed' },
  { id:10, name:'Beef Noodle Soup', price:6.0, stock:7, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fff1f2' },
  { id:11, name:'Grilled Pork Rice', price:5.0, stock:9, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fef3c7' },
  { id:12, name:'Chicken Burger', price:4.5, stock:13, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fef9c3' },
  { id:13, name:'French Fries', price:2.2, stock:25, cat:'food', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fefce8' },

  // SNACKS
  { id:14, name:'Potato Chips', price:1.5, stock:4, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fef9c3' },
  { id:15, name:'Chocolate Bar', price:1.2, stock:20, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#f5f0e8' },
  { id:16, name:'Mixed Nuts', price:2.5, stock:16, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf4e7' },
  { id:17, name:'Ice Cream Cup', price:2.8, stock:8, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf2f8' },
  { id:18, name:'Donut', price:1.7, stock:10, cat:'snacks', imageUrl:'https://i.pinimg.com/736x/e9/a8/6c/e9a86c78b0c1fcc1da9e7e69e0773656.jpg', color:'#fdf2f8' },
];
export const ProductList = () => {
  return (
    <div className="p-4  ">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((item) => (
          <div className="rounded-2xl shadow-sm relative">
            <img src={item.imageUrl} alt="" className="w-full h-60 object-cover rounded-2xl" />
            <div className="p-2 absolute bottom-0 left-0 right-0 bg-black/10 backdrop-blur-sm rounded-2xl flex">
               <div className="flex-1">
                 <h1 className="font-medium text-white">{item.name}</h1>
                <p className="text-sm text-white">${item.price}</p>
               </div>
                <p className="text-sm text-white">{item.stock}</p>
                <p className="text-sm text-white">{item.cat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
