import { Pencil, Trash2 } from "lucide-react"
import type { Product } from "../../../types/product.type";
import { getProductImage } from "../../../lib/productImage";

const Table = ({ products, setModalOpen, setSelectedProduct, limit }: { products: Product[], setModalOpen: (val: boolean) => void, setSelectedProduct: (val: Product) => void, limit: number }) => {
  return (
    <div>
      <div className="grid gap-3 p-4 md:hidden">
        {products.map((product) => {
          const salePrice = Number(product.price) * (1 - Number(product.discount ?? 0) / 100);
          return (
            <div key={product.id} className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex gap-3">
                <img src={getProductImage(product.name, product.imageUrl, product.category?.name)} alt={product.name} className="h-20 w-20 rounded-md border border-slate-200 object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="line-clamp-1 text-sm font-semibold text-slate-950">{product.name}</h3>
                      <p className="mt-0.5 text-xs text-slate-500">{product.category?.name || "Uncategorized"}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalOpen(true);
                      }}
                      className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-slate-400">Price</p>
                      <p className="font-semibold text-slate-950">${Number(product.price).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Sale</p>
                      <p className="font-semibold text-slate-950">${salePrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Stock</p>
                      <p className="font-semibold text-slate-950">{product.stock}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[920px] text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <th className="px-5 py-3">Product</th>
            <th className="px-5 py-3">SKU</th>
            <th className="px-5 py-3 text-right">Price</th>
            <th className="px-5 py-3 text-right">Sale Price</th>
            <th className="px-5 py-3 text-center">Stock</th>
            <th className="px-5 py-3">Category</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => {
            const salePrice = Number(product.price) * (1 - Number(product.discount ?? 0) / 100);
            return (
              <tr key={product.id} className="bg-white transition hover:bg-slate-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={getProductImage(product.name, product.imageUrl, product.category?.name)} alt={product.name} className="h-11 w-11 rounded-md border border-slate-200 object-cover" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-950">{product.name}</div>
                      <div className="truncate text-xs text-slate-500">{product.description || "No description"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm font-medium text-slate-500">#{product.id}</td>
                <td className="px-5 py-3 text-right text-sm font-semibold text-slate-950">${Number(product.price).toFixed(2)}</td>
                <td className="px-5 py-3 text-right text-sm text-slate-600">${salePrice.toFixed(2)}</td>
                <td className="px-5 py-3 text-center">
                  <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
                    product.stock > 10 ? "bg-emerald-50 text-emerald-700" : product.stock > 0 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-slate-600">{product.category?.name || "Uncategorized"}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalOpen(true);
                      }}
                      className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                    >
                      <Pencil size={16} />
                    </button>
                    <button className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
          {products.length < limit && Array.from({ length: limit - products.length }).map((_, index) => (
            <tr key={`empty-${index}`} className="h-[69px] bg-white">
              <td colSpan={7} />
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Table
