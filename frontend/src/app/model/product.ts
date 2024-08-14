import { Category } from "../modules/catalog/model/Category";

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  created_at: Date;
  updated_at: Date;
  imageUrl: string;
}