const data = [
  {
    id: "TRX-9842",
    timestamp: "2024-05-20T14:22:00Z",
    items: 3,
    total: 23.00,
    paymentMethod: "Credit Card",
    status: "Completed"
  },
  {
    id: "TRX-9843",
    timestamp: "2024-05-20T14:45:00Z",
    items: 1,
    total: 18.50,
    paymentMethod: "Apple Pay",
    status: "Completed"
  },
  {
    id: "TRX-9844",
    timestamp: "2024-05-20T15:10:00Z",
    items: 1,
    total: 45.00,
    paymentMethod: "Cash",
    status: "Refunded"
  }
]

export const OrderPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Orders</h1>
          <p className="mt-1 text-sm text-slate-500">Review recent sales, payment methods, and order status.</p>
        </div>
        <button className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Export
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Today Revenue</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">$86.50</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Orders</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">3</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Refunds</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">1</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-3 p-4 md:hidden">
          {data.map((order) => (
            <div key={order.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{order.id}</p>
                  <p className="mt-1 text-xs text-slate-500">{new Date(order.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {order.paymentMethod}</p>
                </div>
                <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                  order.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-500">{order.items} items</span>
                <span className="font-semibold text-slate-950">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Time</th>
              <th className="px-5 py-3 text-center">Items</th>
              <th className="px-5 py-3">Payment</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 text-sm font-semibold text-slate-950">{order.id}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{new Date(order.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                <td className="px-5 py-4 text-center text-sm text-slate-600">{order.items}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{order.paymentMethod}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                    order.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right text-sm font-semibold text-slate-950">${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
