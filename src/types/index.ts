export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  colors?: string[];
  lengths?: string[];
  tags: string[];
}

export type Category =
  | "frontals"
  | "bone-straight"
  | "curly"
  | "braided"
  | "wigs"
  | "closures";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedLength?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Voucher {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}