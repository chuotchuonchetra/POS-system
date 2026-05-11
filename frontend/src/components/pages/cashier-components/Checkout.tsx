import { Minus, Plus, Trash, Wallet } from "phosphor-react";
import type { Product } from "../../../types/product.type";

interface Props {
    cart: Product[];
    onQuantityChange: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
    clearCart: () => void;
}

export const Checkout = ({ cart, onQuantityChange, onRemove, clearCart }: Props) => {
    const subtotal = cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
    );

    const tax = subtotal * 0.1;

    const total = subtotal + tax;

    return (
        <div className="h-screen w-[420px] bg-[#f8fafc] border-l border-gray-200 flex flex-col relative z-40">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-2.5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Checkout
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {cart.length} Items
                        </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                        {cart.length}
                    </div>
                </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {cart.map((p: Product) => (
                    <div
                        key={p.id}
                        className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100"
                    >
                        <div className="flex gap-4">

                            {/* Product Image */}
                            <img
                                src={p.imageUrl}
                                alt={p.name}
                                className="w-24 h-24 rounded-2xl object-cover bg-gray-100"
                            />

                            {/* Product Info */}
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="font-bold text-gray-900 line-clamp-1">
                                            {p.name}
                                        </h2>

                                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                                            {p.description}
                                        </p>
                                    </div>

                                    <div className="flex justify-end">
                                        <Trash
                                            size={20}
                                            className="text-red-500 cursor-pointer hover:scale-110 transition"
                                        />
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-lg font-bold text-black">
                                        ${Number(p.price).toFixed(2)}
                                    </span>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-3 py-2">
                                        <button
                                            onClick={() =>
                                                onQuantityChange(
                                                    p.id,
                                                    p.quantity > 1
                                                        ? p.quantity - 1
                                                        : p.quantity
                                                )
                                            }
                                            className="w-7 h-7 rounded-xl bg-white flex items-center justify-center shadow-sm hover:bg-gray-50"
                                        >
                                            <Minus size={14} />
                                        </button>

                                        <span className="font-semibold text-sm min-w-[20px] text-center">
                                            {p.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                onQuantityChange(
                                                    p.id,
                                                    p.quantity + 1
                                                )
                                            }
                                            className="w-7 h-7 rounded-xl bg-black text-white flex items-center justify-center hover:bg-gray-800"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Payment */}
            <div className="bg-white border-t border-gray-100 p-5 space-y-4">

                {/* Summary */}
                <div className="space-y-3">
                    <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-dashed pt-3 flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Pay Button */}
                <div className="flex items-center justify-center gap-2">
                    <div className="cursor-pointer">
                        <button onClick={() => clearCart()}
                            className=" w-30 h-12 bg-red-500 hover:bg-red-600 text-white py-2 rounded-2xl font-semibold text-lg transition-all duration-200 active:scale-[0.99]">
                            Clear
                        </button>
                    </div>
                    <button className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-2xl font-semibold text-lg transition-all duration-200 active:scale-[0.99]">
                        Checkout
                    </button>

                    <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center">
                        <Wallet size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};