const productImages = [
  {
    keywords: ["coffee", "espresso", "latte", "americano", "cappuccino", "mocha"],
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["tea", "milk tea", "matcha", "boba"],
    url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["burger", "sandwich", "chicken", "beef"],
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["cake", "brownie", "bread", "bakery", "croissant"],
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    keywords: ["juice", "smoothie", "soda", "drink"],
    url: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80",
  },
];

export const getProductImage = (name: string, imageUrl?: string, categoryName?: string) => {
  if (imageUrl && imageUrl.trim().length > 0) return imageUrl;

  const searchable = `${name} ${categoryName ?? ""}`.toLowerCase();
  const match = productImages.find((item) =>
    item.keywords.some((keyword) => searchable.includes(keyword))
  );

  return match?.url ?? "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";
};
