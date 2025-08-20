import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

export interface CreateProductData {
  name: string;
  price: number;
  image: string;
}

export const createProduct = async (productData: CreateProductData): Promise<any> => {
  try {
    const response = await api.post("/", productData);
    return response.data;
  } catch (error) {
    console.error("Create product error:", error);
    throw error;
  }
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};