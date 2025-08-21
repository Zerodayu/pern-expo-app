import { useGetProducts } from "@/api/getProducts";
import SafeScreen from "@/components/SafeArea";
import { COLORS, PADDINGS, SIZE, THEMES } from "@/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CirclePlus, House, ShoppingCart } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

// Create a client
const queryClient = new QueryClient();

const CustomHeader = () => (
  <View style={styles.header}>
    <ShoppingCart size={SIZE.xl} color={COLORS.primary} />
    <Text style={styles.headerTitle}>
      POSGRESTORE
    </Text>
  </View>
);

const TabsLayout = () => {
  const { data: products } = useGetProducts();
  const productCount = products?.length || 0;

  return (
    <Tabs screenOptions={{
      headerShown: true,
      header: () => <CustomHeader />,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.muted,
      animation: "fade",
      tabBarStyle: {
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderColor: COLORS.secondary,
        borderStyle: "solid",
      }
    }}>
      <Tabs.Screen name="(products)"
        options={{
          title: "Products",
          tabBarBadge: productCount > 0 ? productCount : undefined,
          tabBarBadgeStyle: styles.badge,
          tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
        }} />

      <Tabs.Screen name="index"
        options={{
          title: "Add",
          tabBarIcon: ({ color, size }) => <CirclePlus size={size} color={color} />,
        }} />
    </Tabs>
  );
};

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeScreen>
        <StatusBar style={COLORS === THEMES.dark ? "light" : "dark"} /> 
        <TabsLayout />
      </SafeScreen>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: PADDINGS.sm,
    flexDirection: "row",
    alignItems: "center",
    padding: PADDINGS.md,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
  badge: {
    backgroundColor: COLORS.foreground,
    color: COLORS.primary,
    fontFamily: "monospace"
  }
});
