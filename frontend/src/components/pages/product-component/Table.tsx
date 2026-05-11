import { Pencil, Trash } from "phosphor-react"
import type { Product } from "../../../types/product.type";


const Table = ({ products, setModalOpen, setSelectedProduct, limit }: { products: Product[], setModalOpen: (val: boolean) => void, setSelectedProduct: (val: Product) => void, limit: number }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 text-gray-600 uppercase text-xs tracking-wider">
                        <th className="px-6 py-4 font-semibold">Product</th>
                        <th className="px-6 py-4 font-semibold">ID</th>
                        <th className="px-6 py-4 font-semibold text-center">Price</th>
                        <th className="px-6 py-4 font-semibold text-center">Discount Price</th>
                        <th className="px-6 py-4 font-semibold text-center">Stock</th>
                        <th className="px-6 py-4 font-semibold">Category</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 h-[620px]">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
                            <td className="px-6">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.imageUrl as string}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                                    />
                                    <span className="font-medium text-gray-900">{product.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-3 text-sm text-gray-500 font-mono">#{product.id}</td>
                            <td className="px-6 py-3 text-center">
                                <div className="text-sm font-semibold text-gray-900">${product.price}</div>
                            </td>
                            <td className="px-6 py-3 text-center">
                                <span>${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                            </td>
                            <td className="px-6 py-3 text-center">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {product.stock} in stock
                                </span>
                            </td>
                            <td className="px-6 py-3">
                                <span className="text-sm text-gray-600">{product.category.name || "Uncategorized"}</span>
                            </td>
                            <td className="px-6 py-3 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setModalOpen(true);
                                        }}
                                        className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                        <Pencil size={18} />
                                    </button>
                                    <button className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                                        <Trash size={18} />
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                    {products.length < limit && (
                        Array.from({ length: limit - products.length }).map((_, index) => (
                            <tr key={`empty-${index}`} >
                                <td colSpan={6} className="px-6 py-2  border-gray-200">&nbsp;</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table