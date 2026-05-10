
import { Pencil, Trash, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/getAllProducts";
import ProductModal from "../ProductModal";
import type { Product } from "../../types/product.type";

const ProductPage = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    getAllProducts(page, limit, setProducts, setTotalPages);
  }, [page, limit]);


  return (
    <div className="p-4 bg-gray-50 h-auto">
      <div className=" mx-auto w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Table Header Section */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your inventory and stock levels</p>
          </div>
          <button onClick={handleOpenAddModal} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm">
            <Plus size={20} weight="bold" />
            Add Product
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-600 uppercase text-xs tracking-wider">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold text-center">Price</th>
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
                        src={product.imageUrl}
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

        <div className="p-5 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Page <span className="font-semibold text-gray-900">{page}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductPage;