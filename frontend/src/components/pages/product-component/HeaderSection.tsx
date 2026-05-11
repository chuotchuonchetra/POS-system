import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "../../ui/input";

export const HeaderSection = ({ handleOpenAddModal, search, setSearch }: { handleOpenAddModal: () => void, search: string, setSearch: (val: string) => void }) => {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Manage catalog items, pricing, images, and stock levels.</p>
        </div>
        <button onClick={handleOpenAddModal} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-slate-950">
          <Search size={17} className="text-slate-400" />
          <Input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 border-0 px-0 shadow-none ring-0 focus-visible:ring-0"
          />
        </div>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <SlidersHorizontal size={17} />
          Filters
        </button>
      </div>
    </div>
  )
}
