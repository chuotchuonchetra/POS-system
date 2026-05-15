import { useEffect, useState, useMemo } from "react";
import { getAllOrders } from "../../services/orders/getAllOrders";
import { OrderDetailDrawer } from "./order-components/OrderDetail";

// Interface updated: orderDetails is usually an array
interface OrderDetail {
  id: number;
  quantity: number;
  unitPrice: string;
  productId: number;
  product: {
    name: string;
    price: string;
    discount: string;
    category: { name: string };
    imageUrl: string;
  };
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  user: { name: string; role: string };
  orderDetails: OrderDetail[]; // Changed to array
}

export const OrderPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // New state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // New state
  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await getAllOrders();
        if (response.data) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllOrders();
  }, []);
  // --- Business Logic Calculations ---
  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0);

    const refunds = orders.filter((o) => o.status.toLowerCase() === "refunded").length;

    return {
      revenue: revenue.toFixed(2),
      orderCount: orders.length,
      refunds: refunds,
    };
  }, [orders]);

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-100";
      case "refunded": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
      {/* Header */}
      <div className="mx-auto max-w-10xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Orders</h1>
            <p className="mt-2 text-slate-500">Manage transactions and track store performance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard title="Today's Revenue" value={`$${stats.revenue}`} subtext="From current orders" />
          <StatCard title="Total Orders" value={stats.orderCount.toString()} subtext="Lifetime volume" />
          <StatCard title="Refunds" value={stats.refunds.toString()} subtext="Processed returns" />
        </div>

        {/* Orders Table Container */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center text-slate-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-slate-500">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4 text-center">Items</th>
                    <th className="px-6 py-4 text-center">Payment Method</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr onClick={() => handleRowClick(order)} key={order.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-indigo-600">#ORD-{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{order.user.name}</div>
                        <div className="text-xs text-slate-500 capitalize">{order.user.role}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                        <span className="ml-2 text-slate-400">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-slate-600">
                        {order.orderDetails.reduce((acc, curr) => acc + curr.quantity, 0)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-slate-600">{order.paymentMethod}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-bold text-slate-900">
                        ${parseFloat(order.totalAmount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ title, value, subtext }: { title: string; value: string; subtext: string }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <div className="mt-2 flex items-baseline gap-2">
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
    <p className="mt-1 text-xs text-slate-400">{subtext}</p>
  </div>
);