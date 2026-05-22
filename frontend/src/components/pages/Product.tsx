import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products/getAllProducts";
import ProductModal from "../ProductModal";
import type { Product } from "../../types/product.type";

import Table from "./product-component/Table";
import { HeaderSection } from "./product-component/HeaderSection";

const ProductPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
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
    setRefreshTick((prev) => prev + 1);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts(page, limit);
      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);
    };
    fetchProducts();
  }, [page, limit, refreshTick]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 pt-4 ">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <HeaderSection
          handleOpenAddModal={handleOpenAddModal}
          search={search}
          setSearch={setSearch}
        />

        <Table
          products={products}
          setModalOpen={setModalOpen}
          setSelectedProduct={setSelectedProduct}
          limit={limit}
        />

        <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-slate-600">
            Page <span className="font-semibold text-slate-950">{page}</span> of{" "}
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
      <ProductModal
        key={selectedProduct?.id ?? "new-product"}
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
