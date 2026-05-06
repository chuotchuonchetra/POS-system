import { useState } from "react"
import { Checkout } from "./cashier-components/Checkout"
import { ProductList } from "./cashier-components/ProductList"
import { SearchBar } from "./cashier-components/SearchBar"
import type { Product } from "../../types/product.type";

export const CashierPage = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const handleUpdateCart = (product: Product) => {
    setCart([...cart, {...product, quantity: 1}]);
  };
  const handleQuantityChange = (productId: number, quantity: number) => {
    setCart(cart.map((item) => item.id === productId ? {...item, quantity} : item));
  };
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <SearchBar />
        <div className="overflow-y-auto p-6">
          {/* Pass the cart down so ProductList knows which items are already selected */}
          <ProductList cart={cart} onUpdateCart={handleUpdateCart} />
        </div>
      </div>
      <div className="w-100 border-l bg-white">
        <Checkout cart={cart}  onQuantityChange={handleQuantityChange}/>
      </div>
    </div>
  );
};