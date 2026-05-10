import { ShoppingCart, Package } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  quantity?: number;
  discount: number;
  category: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const finalPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}

        {/* Stock */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Package size={12} />
          {product.stock}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        
        {/* Category */}
        <span className="text-xs font-medium text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded-full">
          {product.category}
        </span>

        {/* Name */}
        <div>
          <h2 className="font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h2>

          {product.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${finalPrice}
          </span>

          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${product.price}
            </span>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => onAddToCart?.(product)}
          disabled={product.stock === 0}
          className={`mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-200
            ${
              product.stock === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 active:scale-[0.98]"
            }`}
        >
          <ShoppingCart size={18} />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}