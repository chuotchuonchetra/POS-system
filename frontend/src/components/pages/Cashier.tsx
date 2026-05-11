import { useState } from "react"
import { Checkout } from "./cashier-components/Checkout"
import { ProductList } from "./cashier-components/ProductList"
import { SearchBar } from "./cashier-components/SearchBar"
import type { Product } from "../../types/product.type";

export const CashierPage = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const handleUpdateCart = (product: Product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };
  const handleQuantityChange = (productId: number, quantity: number) => {
    setCart(cart.map((item) => item.id === productId ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    console.log('cleared')
    setCart([]);
  };
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="flex-1 flex flex-col">
        <SearchBar />
        <div className=" p-6">
          {/* Pass the cart down so ProductList knows which items are already selected */}
          <ProductList cart={cart} onUpdateCart={handleUpdateCart} />
        </div>
      </div>
      <div className=" border-l bg-white">
        <Checkout cart={cart} onQuantityChange={handleQuantityChange} onRemove={handleRemoveItem} clearCart={handleClearCart} />
      </div>
    </div>
  );
};