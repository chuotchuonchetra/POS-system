const data = [
  {
    id: 7,
    name: "USB-C Docking Station",
    price: 90.0,
    discount: 2.13,
    stock: 16,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778649572/pos-products/sgujgmk5xophbaggj74n.jpg",
    categoryId: 1,
    description:
      "High-quality USB-C Docking Station designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 60.0,
    discount: 3.61,
    stock: 23,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778521265/pos-products/ngcmrgdl0cfiruc1i6j1.jpg",
    categoryId: 1,
    description:
      "High-quality Gaming Mouse designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "External 1TB SSD",
    price: 80.0,
    discount: 2.31,
    stock: 1,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778572535/pos-products/dpx3i0ljti93t8vwt9fw.jpg",
    categoryId: 1,
    description:
      "High-quality External 1TB SSD designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 50.0,
    discount: 1.71,
    stock: 50,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778572619/pos-products/whucxiu8yq7iqpffa5m1.jpg",
    categoryId: 1,
    description:
      "High-quality Mechanical Keyboard designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 21,
    name: "Storage Ottoman",
    price: 60.0,
    discount: 1.27,
    stock: 30,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 2,
    description:
      "High-quality Storage Ottoman designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 19,
    name: "Wooden Coffee Table",
    price: 50.0,
    discount: 0.72,
    stock: 35,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 2,
    description:
      "High-quality Wooden Coffee Table designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 14,
    name: "Bookshelf Unit",
    price: 25.0,
    discount: 2.09,
    stock: 24,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1779447741/pos-products/jipr8wznfrz0afzfsbuw.jpg",
    categoryId: 2,
    description:
      "High-quality Bookshelf Unit designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    name: "HDMI 2.1 Cable",
    price: 130.0,
    discount: 3.03,
    stock: 100,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778649655/pos-products/tkb966v9pvyznsbrexhh.jpg",
    categoryId: 1,
    description:
      "High-quality HDMI 2.1 Cable designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    name: "Standing Desk",
    price: 120.0,
    discount: 3.88,
    stock: 17,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778649771/pos-products/jdtgfzjajidt7ierhmfg.jpg",
    categoryId: 2,
    description:
      "High-quality Standing Desk designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "1080p Webcam",
    price: 70.0,
    discount: 0.56,
    stock: 12,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778649847/pos-products/zknxidljuah1pejc6n80.jpg",
    categoryId: 1,
    description:
      "High-quality 1080p Webcam designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 18,
    name: "Memory Foam Seat Cushion",
    price: 45.0,
    discount: 4.9,
    stock: 27,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 2,
    description:
      "High-quality Memory Foam Seat Cushion designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 20,
    name: "Floor Mirror",
    price: 55.0,
    discount: 3.49,
    stock: 35,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 2,
    description:
      "High-quality Floor Mirror designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 17,
    name: "Velvet Armchair",
    price: 40.0,
    discount: 3.9,
    stock: 29,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 2,
    description:
      "High-quality Velvet Armchair designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10,
    name: "Wireless Charger Pad",
    price: 120.0,
    discount: 2.14,
    stock: 34,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778571445/pos-products/dufbv1becebt7ogzx15l.jpg",
    categoryId: 1,
    description:
      "High-quality Wireless Charger Pad designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 16,
    name: "Table Lamp",
    price: 35.0,
    discount: 2.31,
    stock: 42,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 2,
    description:
      "High-quality Table Lamp designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    name: "Smart Watch Series 5",
    price: 100.0,
    discount: 0.88,
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778574071/pos-products/cbznxlbspnztfu6dnmre.jpg",
    categoryId: 1,
    description:
      "High-quality Smart Watch Series 5 designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 22,
    name: "Cast Iron Skillet",
    price: 15.0,
    discount: 1.21,
    stock: 31,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 3,
    description:
      "High-quality Cast Iron Skillet designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 23,
    name: "Non-Stick Frying Pan",
    price: 20.0,
    discount: 2.4,
    stock: 24,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 3,
    description:
      "High-quality Non-Stick Frying Pan designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 24,
    name: "Professional Chef Knife",
    price: 25.0,
    discount: 2.55,
    stock: 51,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 3,
    description:
      "High-quality Professional Chef Knife designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 25,
    name: "Electric Kettle",
    price: 30.0,
    discount: 2.92,
    stock: 54,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 3,
    description:
      "High-quality Electric Kettle designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 27,
    name: "Glass Food Containers",
    price: 40.0,
    discount: 4.11,
    stock: 35,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 3,
    description:
      "High-quality Glass Food Containers designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 26,
    name: "Silicone Baking Mats",
    price: 35.0,
    discount: 3.59,
    stock: 21,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 3,
    description:
      "High-quality Silicone Baking Mats designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    name: "Bluetooth Speaker",
    price: 110.0,
    discount: 4.03,
    stock: 17,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778571409/pos-products/h5ow6hgf27kjlwhvutfn.jpg",
    categoryId: 1,
    description:
      "High-quality Bluetooth Speaker designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 28,
    name: "Bamboo Cutting Board",
    price: 45.0,
    discount: 2.57,
    stock: 26,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 3,
    description:
      "High-quality Bamboo Cutting Board designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 29,
    name: "French Press Coffee Maker",
    price: 50.0,
    discount: 3.52,
    stock: 28,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 3,
    description:
      "High-quality French Press Coffee Maker designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 30,
    name: "Stainless Steel Mixing Bowls",
    price: 55.0,
    discount: 1.42,
    stock: 40,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 3,
    description:
      "High-quality Stainless Steel Mixing Bowls designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 32,
    name: "Organic Cotton T-Shirt",
    price: 15.0,
    discount: 3.52,
    stock: 24,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 4,
    description:
      "High-quality Organic Cotton T-Shirt designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 33,
    name: "Slim Fit Denim Jeans",
    price: 20.0,
    discount: 0.92,
    stock: 43,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 4,
    description:
      "High-quality Slim Fit Denim Jeans designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 34,
    name: "Hooded Sweatshirt",
    price: 25.0,
    discount: 4.58,
    stock: 41,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 4,
    description:
      "High-quality Hooded Sweatshirt designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 35,
    name: "Running Shorts",
    price: 30.0,
    discount: 2.54,
    stock: 33,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 4,
    description:
      "High-quality Running Shorts designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 36,
    name: "Crew Neck Sweater",
    price: 35.0,
    discount: 3.92,
    stock: 26,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 4,
    description:
      "High-quality Crew Neck Sweater designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 37,
    name: "Performance Socks",
    price: 40.0,
    discount: 0.49,
    stock: 55,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 4,
    description:
      "High-quality Performance Socks designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 38,
    name: "Canvas Tote Bag",
    price: 45.0,
    discount: 0.91,
    stock: 43,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 4,
    description:
      "High-quality Canvas Tote Bag designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 39,
    name: "Baseball Cap",
    price: 50.0,
    discount: 3.69,
    stock: 20,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 4,
    description:
      "High-quality Baseball Cap designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 40,
    name: "Rain Jacket",
    price: 55.0,
    discount: 2.28,
    stock: 30,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778512474/pos-products/pbv7skhshsf5xyyhutzx.jpg",
    categoryId: 4,
    description:
      "High-quality Rain Jacket designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 31,
    name: "Digital Kitchen Scale",
    price: 60.0,
    discount: 0.23,
    stock: 51,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778523593/pos-products/jkgb4lihaaftusjdjttu.jpg",
    categoryId: 3,
    description:
      "High-quality Digital Kitchen Scale designed for durability and daily use in the Kitchenware category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 12,
    name: "Ergonomic Office Chair",
    price: 85.0,
    discount: 2.86,
    stock: 31,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778649812/pos-products/craf27cek6y8dqh1hq7d.jpg",
    categoryId: 2,
    description:
      "High-quality Ergonomic Office Chair designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 41,
    name: "Lightweight Windbreaker",
    price: 60.0,
    discount: 1.41,
    stock: 31,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 4,
    description:
      "High-quality Lightweight Windbreaker designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    name: "Side Table",
    price: 30.0,
    discount: 2.85,
    stock: 42,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778207258/pos-products/yo5fnofxe872zjcrlyhr.jpg",
    categoryId: 2,
    description:
      "High-quality Side Table designed for durability and daily use in the Furniture category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Noise Cancelling Headphones",
    price: 40.0,
    discount: 1.16,
    stock: 12,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1778572678/pos-products/xo2loxjpb7p11xsdvzks.jpg",
    categoryId: 1,
    description:
      "High-quality Noise Cancelling Headphones designed for durability and daily use in the Electronics category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    price: 20.0,
    discount: 0.0,
    stock: 142,
    imageUrl:
      "https://res.cloudinary.com/djjyo9zoq/image/upload/v1779246980/pos-products/j57ktrj5ezpzppiqd61q.jpg",
    categoryId: 4,
    description:
      "High-quality Organic Cotton T-Shirt designed for durability and daily use in the Apparel category.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
