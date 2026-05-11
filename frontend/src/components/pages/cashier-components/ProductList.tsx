import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import type { Product } from "../../../types/product.type";
import { api } from "../../../lib/api";
import { getProductImage } from "../../../lib/productImage";

interface Category {
  id: number;
  name: string;
}

interface Props {
  cart: Product[];
  onUpdateCart: (product: Product) => void;
}

// Accept cart and the update function from parent
export const ProductList = ({ cart, onUpdateCart }: Props) => {
  const [activeTab, setActiveTab] = useState("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/products', {
        params: activeTab === 'all' ? undefined : { categoryId: activeTab },
      });
      setProducts(response.data.products);
    };
    fetchProducts();
  }, [activeTab]);

  return (
    /* 
       1. Set the main container to a fixed height and flex-col. 
       2. Remove overflow-y-scroll from here so the header stays put.
    */
    <div className="flex h-full flex-col overflow-hidden">
      <Tabs defaultValue={'all'} onValueChange={setActiveTab} className="w-full flex flex-col h-full">

        {/* 
           TAB LIST (Fixed Header)
           Added 'shrink-0' to ensure the header doesn't compress 
        */}
        <TabsList className="mb-5 flex h-auto shrink-0 flex-wrap gap-2 bg-transparent p-0">
          <TabsTrigger
            value={'all'}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm data-[state=active]:bg-slate-950 data-[state=active]:text-white"
          >
            All Products
          </TabsTrigger>
          {categories?.map((c) => (
            <TabsTrigger
              key={c.id}
              value={c.id.toString()}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm data-[state=active]:bg-slate-950 data-[state=active]:text-white"
            >
              {c.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          value={activeTab}
          className="mt-0 grow overflow-y-auto pr-2 outline-none"
        >
          <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {products?.map((p) => {
              const cartItem = cart.find((item: Product) => item.id === p.id);
              const isInCart = Boolean(cartItem);
              const imageSrc = getProductImage(p.name, p.imageUrl, p.category?.name);

              return (
                <div
                  key={p.id}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">

                    <img
                      src={imageSrc}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"

                    />


                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">

                      {p.discount > 0 && (

                        <span className="rounded-md bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">

                          {p.discount}% OFF

                        </span>

                      )}
                    </div>
                    <div className="absolute right-3 top-3 rounded-md border border-slate-200 bg-white/95 px-2 py-1 text-[10px] font-bold text-slate-900 shadow-sm">

                      {p.stock > 0 ? `${p.stock} IN STOCK` : 'OUT OF STOCK'}

                    </div>
                  </div>
                  <div className="flex grow flex-col p-4">

                    <span className="w-fit rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">

                      {p.category?.name ?? "Uncategorized"}

                    </span>

                    <div className="mt-3 grow">

                      <h3 className="line-clamp-1 text-base font-semibold text-slate-950">

                        {p.name}

                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">

                        {p.description}

                      </p>

                    </div>

                    <div className="flex items-baseline gap-2 mt-2">

                      <span className="text-xl font-semibold text-slate-950">

                        ${Number(p.price).toLocaleString()}

                      </span>

                      {p.discount > 0 && (

                        <span className="text-sm text-slate-400 line-through decoration-red-400/50">

                          ${(Number(p.price) / (1 - p.discount / 100)).toFixed(0)}

                        </span>

                      )}

                    </div>
                    <div className="mt-2">

                      {!isInCart ? (

                        <button

                          onClick={() => onUpdateCart(p)}

                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Add to Cart

                        </button>

                      ) : (

                        <button

                          className="flex w-full cursor-default items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-700">
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
