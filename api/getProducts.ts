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