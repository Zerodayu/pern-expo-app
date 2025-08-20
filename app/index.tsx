import { Product, useGetProducts } from "@/api/getProducts";
import { COLORS, PADDINGS, RADIUS, SIZE } from "@/themes";
import { SquarePen, Trash } from "lucide-react-native";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { data: products, isLoading, error } = useGetProducts();

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
      
      <Image 
        source={{ uri: item.image }} 
        style={style.image}
        resizeMode="cover"
      />

      <Text style={style.cardPrice}>
        ${item.price}
      </Text>
      
      <View style={style.cardFooter}>
        <TouchableOpacity style={style.cardBtn}>
          <SquarePen size={SIZE.md} color={COLORS.foreground} />
        </TouchableOpacity>

        <TouchableOpacity style={style.cardBtn}>
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
  image: {
    width: "100%",
    height: 150,
    outlineWidth: 1,
    outlineColor: COLORS.secondary,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondary + "20",
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
});
