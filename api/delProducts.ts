import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const response = await api.delete(`/${id}`);
    
    if (response.data && !response.data.success) {
      throw new Error(response.data.message || "Failed to delete product");
    }
  } catch (error) {
    console.error("Delete product error:", error);
    throw error;
  }
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Invalidate and refetch products list after successful deletion
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
    },
  });
};

// Optional: Bulk delete functionality if needed
export const deleteMultipleProducts = async (ids: string[]): Promise<void> => {
  try {
    const deletePromises = ids.map(id => api.delete(`/${id}`));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Bulk delete products error:", error);
    throw error;
  }
};

export const useDeleteMultipleProducts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteMultipleProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Bulk delete mutation error:", error);
    },
  });
};