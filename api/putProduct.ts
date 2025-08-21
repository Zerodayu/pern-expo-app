import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

export interface UpdateProductData {
  name: string;
  price: number;
  image: string;
}

export const updateProduct = async (id: string, productData: UpdateProductData): Promise<any> => {
  try {
    const response = await api.put(`/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Update product error:", error);
    throw error;
  }
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, productData }: { id: string; productData: UpdateProductData }) => 
      updateProduct(id, productData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // Invalidate and refetch the specific product
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
};