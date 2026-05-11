import { Plus } from "phosphor-react";
import { Input } from "../../ui/input";

export const HeaderSection = ({ handleOpenAddModal, search, setSearch }: { handleOpenAddModal: () => void, search: string, setSearch: (val: string) => void }) => {
    return (
        <div className="p-6 border-b border-gray-100 flex flex-col  gap-4 bg-white">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your inventory and stock levels</p>
            </div>
            <div className="flex justify-between items-center gap-2">
                <div className="">
                    <Input
                        type="text"
                        placeholder="Search"

                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-100 py-4.5"
                    />
                    <select className="px-5 py-1.5 border border-gray-200 rounded-lg cursor-pointer" name="" id="">
                        <option value="">All Categories</option>
                    </select>
                </div>
                <button onClick={handleOpenAddModal} className="flex items-center gap-2 bg-black  text-white px-5 py-1.5 rounded-lg font-medium transition-all shadow-sm">
                    <Plus size={20} weight="bold" />
                    Add Product
                </button>
            </div>
        </div>
    )
}