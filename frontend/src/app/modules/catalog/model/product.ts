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
  created_at: Date;
  updated_at: Date;

  imageUrl: string;
}