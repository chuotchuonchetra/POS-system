import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/orders/getAllOrders";
import { OrderDetailDrawer } from "./order-components/OrderDetail";
import type { Order } from "../../types/order.type";

export const OrderPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalOrder, setTotalOrder] = useState(0);
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
        const response = await getAllOrders(page, limit);
        if (response.success) {
          console.log(response);
          setOrders(response.data);
          setTotalOrder(response.pagination.total);
          setTotalPages(response.pagination.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllOrders();
  }, [page, limit]);

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "refunded":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-4">
      {/* Header */}
      <div className="mx-auto max-w-10xl">
        <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Orders
            </h1>
            <p className="mt-2 text-slate-500">
              Manage transactions and track store performance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-4 grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Today's Revenue"
            value={`0`}
            subtext="From current orders"
          />
          <StatCard
            title="Total Orders"
            value={String(totalOrder)}
            subtext="Lifetime volume"
          />
          <StatCard title="Refunds" value={"0"} subtext="Processed returns" />
        </div>

        {/* Orders Table Container */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {isLoading ?
            <div className="flex h-64 items-center justify-center text-slate-500">
              Loading orders...
            </div>
          : orders.length === 0 ?
            <div className="flex h-64 items-center justify-center text-slate-500">
              No orders found.
            </div>
          : <div className="overflow-x-auto">
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
                    <tr
                      onClick={() => handleRowClick(order)}
                      key={order.id}
                      className="group hover:bg-slate-50 transition-colors">
                      <td className="px-6 md:py-3 py-2text-sm font-medium text-indigo-600">
                        #ORD-{order.id}
                      </td>
                      <td className="px-6 md:py-3 py-2">
                        <div className="text-sm font-medium text-slate-900">
                          {order.user.name}
                        </div>
                        <div className="text-xs text-slate-500 capitalize">
                          {order.user.role}
                        </div>
                      </td>
                      <td className="px-6  md:py-3 py-2 text-sm text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                        <span className="ml-2 text-slate-400">
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td className="px-6 md:py-3 py-2 text-center text-sm text-slate-600">
                        {order.orderDetails.reduce(
                          (acc, curr) => acc + curr.quantity,
                          0,
                        )}
                      </td>
                      <td className="px-6 md:py-2 py-4 text-center text-sm text-slate-600">
                        {order.paymentMethod}
                      </td>
                      <td className="px-6 md:py-2 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 md:py-3 py-2 text-center text-sm font-bold text-slate-900">
                        ${parseFloat(order.totalAmount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {orders.length < limit &&
                    Array.from({ length: limit - orders.length }).map(
                      (_, index) => (
                        <tr
                          key={`empty-${index}`}
                          className="h-[60.8px] bg-white">
                          <td colSpan={7} />
                        </tr>
                      ),
                    )}
                </tbody>
              </table>
            </div>
          }
          <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-slate-600">
              Page <span className="font-semibold text-slate-950">{page}</span>{" "}
              of{" "}
              <span className="font-semibold text-slate-950">{totalPages}</span>
            </span>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
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
const StatCard = ({
  title,
  value,
  subtext,
}: {
  title: string;
  value: string;
  subtext: string;
}) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <div className="mt-2 flex items-baseline gap-2">
      <p
        className={`text-3xl font-bold ${
          title == "Total Orders" ? "text-green-600"
          : title == "Refunds" ? "text-red-600"
          : "text-gray-900"
        }`}>
        {value}
      </p>
    </div>
    <p
      className={`mt-1 text-xs ${
        title == "Total Orders" ? "text-green-600"
        : title == "Refunds" ? "text-red-600"
        : "text-gray-900"
      }`}>
      {subtext}
    </p>
  </div>
);
