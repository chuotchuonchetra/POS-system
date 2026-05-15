import type { Order } from "../Orders";

interface OrderDetailDrawerProps {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
}

export const OrderDetailDrawer = ({ order, isOpen, onClose }: OrderDetailDrawerProps) => {
    if (!order) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity z-40 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-6 py-4">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Order Details</h2>
                            <p className="text-sm text-slate-500">ID: #ORD-{order.id}</p>
                        </div>
                        <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100 text-slate-500">
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {/* Status & Date */}
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Transaction Date</p>
                                <p className="text-sm font-medium text-slate-700">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {order.status}
                            </span>
                        </div>

                        {/* Items List */}
                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Purchased Items</p>
                            {order.orderDetails.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 rounded-lg border border-slate-100 p-3">
                                    <div className="h-12 w-12 flex-shrink-0 rounded-md bg-slate-100 flex items-center justify-center text-xl">
                                        <img className="h-12 w-12 rounded-md" src={item.product.imageUrl} alt="" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-900">{item.product.name}</p>
                                        <p className="text-xs text-slate-500">Qty: {item.quantity} × ${parseFloat(item.unitPrice || item.product.price).toFixed(2)}</p>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900">
                                        ${(item.quantity * parseFloat(item.unitPrice || item.product.price)).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Customer Info */}
                        <div className="mt-8 rounded-xl bg-slate-50 p-4">
                            <p className="mb-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">Customer & Payment</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Sold by</span>
                                <span className="font-medium text-slate-900">{order.user.name} ({order.user.role})</span>
                            </div>
                            <div className="mt-2 flex justify-between text-sm">
                                <span className="text-slate-500">Payment Method</span>
                                <span className="font-medium text-slate-900">{order.paymentMethod}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Summary */}
                    <div className="border-t bg-slate-50 p-6">
                        <div className="flex justify-between text-lg font-bold text-slate-900">
                            <span>Total Amount</span>
                            <span>${parseFloat(order.totalAmount).toFixed(2)}</span>
                        </div>

                        <button className="mt-4 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-650 transition-colors">
                            Print Receipt
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};