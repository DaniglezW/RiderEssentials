export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: string;
  image: {
    type: string;
    data: number[];
  };
  category_id: number;
  created_at: string;
  updated_at: string;
}