import axios from "axios";
import { CheckCircle, Plus } from "phosphor-react";
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

        <TabsContent value={activeTab} className="mt-0 outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products?.map((p) => {
              // FIND if this product is already in the cart
              const cartItem = cart?.find((item: Product) => item.id === p.id);
              const isInCart = Boolean(cartItem);

              return (
                <div 
                  className="group relative flex flex-col bg-white border border-gray-100 rounded-3xl p-4 transition-all duration-300 hover:shadow-xl hover:border-transparent" 
                  key={p.id}
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
                    <img 
                      src={p.image_url} 
                      alt={p.name} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  
                  <div className="mt-4 flex flex-col grow">
                    <div className=" items-start mb-1">
                      <h3 className="font-semibold text-gray-900 leading-tight text-sm">{p.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-600">${p.price}</span>
                        <span className="font-bold text-blue-600">{p.stock}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">{p.description}</p>
                    
                    <div className="mt-auto">
                      {!isInCart ? (
                        <button 
                          onClick={() => onUpdateCart(p)}
                          className="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          Add to Cart <Plus size={16}/>
                        </button>
                      ) : (
                        <button 
                          
                          className="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          Added to Cart <CheckCircle size={16}/>
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