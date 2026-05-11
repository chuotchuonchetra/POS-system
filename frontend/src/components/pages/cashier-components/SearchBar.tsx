import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-slate-950">Cashier</h1>
        <p className="text-sm text-slate-500">Create a sale and manage the active cart.</p>
      </div>
      <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 focus-within:border-slate-950 lg:w-96">
        <Search size={17} className="text-slate-400" />
        <input type="text" className="flex-1 bg-transparent text-sm outline-none" placeholder="Search products..." />
      </div>
    </div>
  )
}
