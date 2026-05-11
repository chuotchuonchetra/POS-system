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
    setCart([]);
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 xl:h-screen xl:flex-row xl:overflow-hidden">
      <div className="flex min-w-0 flex-1 flex-col xl:min-h-0">
        <SearchBar />
        <div className="min-h-0 flex-1 p-4 sm:p-6">
          {/* Pass the cart down so ProductList knows which items are already selected */}
          <ProductList cart={cart} onUpdateCart={handleUpdateCart} />
        </div>
      </div>
      <div className="shrink-0 border-t border-slate-200 bg-white xl:border-l xl:border-t-0">
        <Checkout cart={cart} onQuantityChange={handleQuantityChange} onRemove={handleRemoveItem} clearCart={handleClearCart} />
      </div>
    </div>
  );
};
