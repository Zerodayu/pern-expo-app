import { useQuery } from "@tanstack/react-query";
import api from "./client";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  created_at: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/");
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error("Fetch products error:", error);
    throw error;
  }
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/${id}`);
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    throw new Error("Product not found");
  } catch (error) {
    console.error("Fetch product by ID error:", error);
    throw error;
  }
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Only run query if id exists
  });
};