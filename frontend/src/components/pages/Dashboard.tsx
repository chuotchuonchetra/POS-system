import { Activity, ArrowUpRight, DollarSign, PackageCheck, ReceiptText, Users } from "lucide-react";

const stats = [
  { label: "Today Revenue", value: "$1,284.50", change: "+12.4%", icon: DollarSign },
  { label: "Orders", value: "86", change: "+8.2%", icon: ReceiptText },
  { label: "Active Products", value: "248", change: "+4 new", icon: PackageCheck },
  { label: "Staff Online", value: "7", change: "2 cashiers", icon: Users },
];

const topProducts = [
  { name: "Iced Latte", category: "Coffee", sold: 42, revenue: "$189.00" },
  { name: "Chicken Sandwich", category: "Food", sold: 31, revenue: "$217.00" },
  { name: "Milk Tea", category: "Drinks", sold: 26, revenue: "$91.00" },
  { name: "Brownie", category: "Bakery", sold: 18, revenue: "$54.00" },
];

const lowStock = [
  { name: "Espresso Beans", stock: 8 },
  { name: "Receipt Paper", stock: 5 },
  { name: "Vanilla Syrup", stock: 3 },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4">
      <div className="mb-2  pt-2 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor store performance, sales activity, and inventory health.</p>
        </div>
        <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto">
          View Report
          <ArrowUpRight size={17} />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                  <Icon size={19} />
                </div>
                <span className="text-xs font-semibold text-emerald-700">{item.change}</span>
              </div>
              <p className="mt-5 text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-950">Sales Activity</h2>
              <p className="text-sm text-slate-500">Hourly order volume for today.</p>
            </div>
            <Activity size={20} className="text-slate-400" />
          </div>
          <div className="relative h-72 overflow-hidden p-5">
            <div className="absolute inset-x-5 top-5 bottom-10 grid grid-rows-4">
              {[0, 1, 2, 3].map((line) => (
                <div key={line} className="border-t border-dashed border-slate-200" />
              ))}
            </div>
            <div className="relative flex h-full items-end gap-2 sm:gap-3">
              {[38, 52, 41, 64, 70, 58, 82, 74, 92, 68, 76, 88].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-emerald-700 to-emerald-400 shadow-sm" style={{ height: `${height}%` }} />
                  <span className="hidden text-[11px] text-slate-400 sm:inline">{index + 8}:00</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-950">Low Stock</h2>
            <p className="text-sm text-slate-500">Items that need attention.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {lowStock.map((item) => (
              <div key={item.name} className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">{item.stock} left</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-950">Top Products</h2>
          <p className="text-sm text-slate-500">Best selling products by units sold.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">Sold</th>
                <th className="px-5 py-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topProducts.map((product) => (
                <tr key={product.name}>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-950">{product.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{product.category}</td>
                  <td className="px-5 py-4 text-right text-sm text-slate-600">{product.sold}</td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-slate-950">{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
