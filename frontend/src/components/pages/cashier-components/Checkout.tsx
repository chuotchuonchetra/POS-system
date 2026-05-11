import { Minus, Plus, Trash2, WalletCards } from "lucide-react";
import type { Product } from "../../../types/product.type";
import { getProductImage } from "../../../lib/productImage";

interface Props {
  cart: Product[];
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  clearCart: () => void;
}

export const Checkout = ({ cart, onQuantityChange, onRemove, clearCart }: Props) => {
  const subtotal = cart.reduce((total, item) => total + Number(item.price) * (item.quantity ?? 0), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <aside className="flex max-h-[72vh] w-full flex-col bg-white xl:h-screen xl:max-h-none xl:w-[410px]">
      <header className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Current Sale</h2>
            <p className="text-sm text-slate-500">{cart.length} items in cart</p>
          </div>
          <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">Draft</div>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <div>
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
                <WalletCards size={22} />
              </div>
              <p className="mt-3 text-sm font-medium text-slate-700">No items selected</p>
              <p className="mt-1 text-xs text-slate-500">Add products to build a sale.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((p) => (
              <div key={p.id} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex gap-3">
                  <img src={getProductImage(p.name, p.imageUrl, p.category?.name)} alt={p.name} className="h-16 w-16 rounded-md bg-slate-100 object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="line-clamp-1 text-sm font-semibold text-slate-950">{p.name}</h3>
                        <p className="mt-0.5 text-xs text-slate-500">${Number(p.price).toFixed(2)} each</p>
                      </div>
                      <button onClick={() => onRemove(p.id)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-slate-200">
                        <button
                          onClick={() => onQuantityChange(p.id, Math.max(1, (p.quantity ?? 1) - 1))}
                          className="flex h-8 w-8 items-center justify-center text-slate-500 hover:bg-slate-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{p.quantity ?? 1}</span>
                        <button
                          onClick={() => onQuantityChange(p.id, (p.quantity ?? 1) + 1)}
                          className="flex h-8 w-8 items-center justify-center text-slate-500 hover:bg-slate-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-sm font-semibold text-slate-950">
                        ${(Number(p.price) * (p.quantity ?? 1)).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="border-t border-slate-200 p-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Tax 10%</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-950">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[0.8fr_1.2fr] gap-3">
          <button onClick={clearCart} className="h-10 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Clear
          </button>
          <button className="h-10 rounded-lg bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700">
            Charge ${total.toFixed(2)}
          </button>
        </div>
      </footer>
    </aside>
  );
};
