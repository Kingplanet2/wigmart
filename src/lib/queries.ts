import { supabase } from "./supabase";
import type { Product } from "../types";

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return (data ?? []).map(mapRowToProduct);
}

// Converts a raw Supabase row (snake_case) into our Product type (camelCase)
function mapRowToProduct(row: any): Product {
  return {
    id: String(row.id),
    name: row.name,
    category: row.category,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    images: row.images ? row.images.split(",").map((s: string) => s.trim()) : [],
    description: row.description,
    rating: Number(row.rating ?? 0),
    reviewCount: Number(row.review_count ?? 0),
    inStock: Boolean(row.in_stock),
    isNew: Boolean(row.is_new),
    isBestseller: Boolean(row.is_bestseller),
    colors: row.colors ? row.colors.split(",").map((s: string) => s.trim()) : undefined,
    lengths: row.lengths ? row.lengths.split(",").map((s: string) => s.trim()) : undefined,
    tags: row.tags ? row.tags.split(",").map((s: string) => s.trim()) : [],
  };
}