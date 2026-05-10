import axios from "axios";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import type { Product } from "../../../types/product.type";



// Accept cart and the update function from parent
export const ProductList = ({ cart, onUpdateCart }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:5000/api/v1/categories');
      setCategories(response.data.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = activeTab === 'all'
        ? `http://localhost:5000/api/v1/products`
        : `http://localhost:5000/api/v1/products?categoryId=${activeTab}`;
      const response = await axios.get(url);
      setProducts(response.data.products);
    };
    fetchProducts();
  }, [activeTab]);

  return (
    <div >
      <Tabs defaultValue={'all'} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 lg:mb-8 xl:mb-10 2xl:mb-4 md:mb-12">
          <TabsTrigger
            value={'all'}
            className="px-6 py-2 rounded-full data-[state=active]:bg-black data-[state=active]:text-white border border-gray-200 transition-all"
          >
            All Products
          </TabsTrigger>
          {categories?.map((c) => (
            <TabsTrigger
              key={c.id}
              value={c.id.toString()}
              className="px-6 py-2 rounded-full data-[state=active]:bg-black data-[state=active]:text-white border border-gray-200 transition-all"
            >
              {c.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0 outline-none overflow-y-auto h-[95%]">



          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products?.map((p) => {
              // FIND if this product is already in the cart
              const cartItem = cart?.find((item: Product) => item.id === p.id);
              const isInCart = Boolean(cartItem);

              return (
                <div
                  key={p.id}
                  className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-50">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {p.discount > 0 && (
                        <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                          {p.discount}% OFF
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-2 py-1 rounded-md border border-gray-100 shadow-sm">
                      {p.stock > 0 ? `${p.stock} IN STOCK` : 'OUT OF STOCK'}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col grow">
                    {/* Category */}
                    <span className="w-fit text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {p.category.name}
                    </span>

                    {/* Name & Description */}
                    <div className="mt-3 grow">
                      <h3 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-2xl font-black text-gray-900">
                        ${Number(p.price).toLocaleString()}
                      </span>
                      {p.discount > 0 && (
                        <span className="text-sm text-gray-400 line-through decoration-red-400/50">
                          ${(Number(p.price) / (1 - p.discount / 100)).toFixed(0)}
                        </span>
                      )}
                    </div>

                    {/* Button Section */}
                    <div className="mt-2">
                      {!isInCart ? (
                        <button
                          onClick={() => onUpdateCart(p)}
                          className="w-full bg-gray-900 hover:bg-blue-600 text-white py-3 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          className="w-full bg-green-50 text-green-600 border border-green-200 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-default"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Added
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};