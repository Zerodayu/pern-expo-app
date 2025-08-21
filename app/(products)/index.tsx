import { useDeleteProduct } from "@/api/delProducts";
import { Product, useGetProducts } from "@/api/getProducts";
import { COLORS, PADDINGS, RADIUS, SIZE } from "@/themes";
import { Link } from "expo-router";
import { Image as Pic, SquarePen, Trash } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { data: products, isLoading, error } = useGetProducts();
  const deleteProductMutation = useDeleteProduct();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string } | null>(null);

  const handleDeletePress = (productId: number, productName: string) => {
    setSelectedProduct({ id: productId, name: productName });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      deleteProductMutation.mutate(selectedProduct.id.toString(), {
        onSuccess: () => {
          Alert.alert("Success", "Product deleted successfully!");
        },
        onError: (error) => {
          Alert.alert("Error", "Failed to delete product. Please try again.");
        },
      });
      setShowDeleteModal(false);
      setSelectedProduct(null);
    }
  };

  if (isLoading) {
    return (
      <View style={[style.base, style.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={style.text}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[style.base, style.centered]}>
        <Text style={[style.text, { color: COLORS.destructive }]}>
          Error loading products
        </Text>
      </View>
    );
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={style.card}>
      <Text style={style.cardTitle}>
        {item.name}
      </Text>
      
      <View style={style.imageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={style.image}
          resizeMode="cover"
          onError={() => {
            // Image failed to load, show fallback icon
          }}
        />
        <View style={style.fallbackIcon}>
          <Pic size={SIZE.xxl} color={COLORS.secondary} />
        </View>
      </View>

      <Text style={style.cardPrice}>
        ${item.price}
      </Text>
      
      <View style={style.cardFooter}>
        <Link href={`/(products)/details/${item.id}`} asChild>
          <TouchableOpacity style={style.cardBtn}>
            <SquarePen size={SIZE.md} color={COLORS.foreground} />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity 
          style={style.cardBtn}
          onPress={() => handleDeletePress(item.id, item.name)}
          disabled={deleteProductMutation.isPending}
        >
          <Trash size={SIZE.md} color={COLORS.destructive} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={style.base}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: PADDINGS.md }}
        showsVerticalScrollIndicator={false}
      />

      {/* Custom Delete Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>Delete Product</Text>
            <Text style={style.modalMessage}>
              Are you sure you want to delete this product? This action cannot be undone.
            </Text>
            <Text style={style.modalProduct}>
              Product name: {selectedProduct?.name}
            </Text>
            
            <View style={style.modalButtons}>
              <Pressable 
                style={[style.modalButton, style.cancelButton]} 
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={style.cancelButtonText}>Cancel</Text>
              </Pressable>
              
              <Pressable 
                style={[style.modalButton, style.deleteButton]} 
                onPress={confirmDelete}
                disabled={deleteProductMutation.isPending}
              >
                <Text style={style.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.foreground,
  },
  card: {
    flexDirection: "column",
    backgroundColor: COLORS.muted,
    gap: PADDINGS.sm,
    borderRadius: RADIUS.xl,
    marginVertical: 8,
    padding: PADDINGS.sm,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: "100%",
    height: 150,
    backgroundColor: COLORS.secondary + "20",
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: "100%",
    height: 150,
    borderRadius: RADIUS.lg,
    backgroundColor: 'transparent',
  },
  fallbackIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: 150,
    zIndex: -1,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: COLORS.foreground,
  },
  cardPrice: {
    fontWeight: "bold",
    fontFamily: "monospace",
    color: COLORS.primary,
    textAlign: "center",
    fontSize: 16,
  },
  cardBtn: {
    padding: PADDINGS.sm,
    paddingHorizontal: PADDINGS.xl,
    outlineWidth: 1,
    outlineColor: COLORS.secondary,
    borderRadius: RADIUS.full,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: PADDINGS.sm,
    paddingTop: PADDINGS.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    padding: PADDINGS.md,
    borderRadius: RADIUS.xl,
    width: '90%',
  },
  modalTitle: {
    fontSize: SIZE.md,
    fontFamily: "monospace",
    fontWeight: 'bold',
    color: COLORS.foreground,
    marginBottom: PADDINGS.md,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: SIZE.sm,
    color: COLORS.foreground,
    marginBottom: PADDINGS.md,
    textAlign: 'center',
  },
  modalProduct: {
    fontSize: SIZE.sm,
    color: COLORS.foreground,
    fontStyle: 'italic',
    marginBottom: PADDINGS.md,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: PADDINGS.xs,
  },
  modalButton: {
    flex: 1,
    padding: PADDINGS.sm,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.muted,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  deleteButton: {
    backgroundColor: COLORS.destructive,
  },
  cancelButtonText: {
    color: COLORS.foreground,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
