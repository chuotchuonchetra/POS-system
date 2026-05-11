

import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products/getAllProducts";
import ProductModal from "../ProductModal";
import type { Product } from "../../types/product.type";

import Table from "./product-component/Table";
import { HeaderSection } from "./product-component/HeaderSection";

const ProductPage = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [refreshTick, setRefreshTick] = useState(0);
  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleSaveProduct = () => {
    setModalOpen(false);
    setRefreshTick(prev => prev + 1);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts(page, limit);
      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);
    }
    fetchProducts();
  }, [page, limit, refreshTick]);


  return (
    <div className="p-4 bg-gray-50 h-auto">
      <div className=" mx-auto w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Table Header Section */}
        <HeaderSection handleOpenAddModal={handleOpenAddModal} search={search} setSearch={setSearch} />

        {/* Table Content */}
        <Table products={products} setModalOpen={setModalOpen} setSelectedProduct={setSelectedProduct} limit={limit} />

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
        onSave={handleSaveProduct}
        product={selectedProduct}
        isEdit={selectedProduct !== null}
      />
    </div>
  );
};

export default ProductPage;