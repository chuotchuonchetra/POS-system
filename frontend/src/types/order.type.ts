export interface OrderDetail {
  id: number;
  quantity: number;
  unitPrice: string;
  productId: number;
  product: {
    name: string;
    price: string;
    discount: string;
    category: { name: string };
    imageUrl: string;
  };
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  user: { name: string; role: string };
  orderDetails: OrderDetail[];
}
