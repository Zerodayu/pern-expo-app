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
  <View style={headerStyles.header}>
    <ShoppingCart size={SIZE.xl} color={COLORS.primary} />
    <Text style={headerStyles.headerTitle}>
      POSGRESTORE
    </Text>
  </View>
);

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeScreen>
        <StatusBar style={COLORS === THEMES.dark ? "light" : "dark"} /> 
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
          <Tabs.Screen name="index"
          options={{
            title: "Products",
            tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
          }} />
          <Tabs.Screen name="add"
          options={{
            title: "Add",
            tabBarIcon: ({ color, size }) => <CirclePlus size={size} color={color} />,
          }} />
        </Tabs>
      </SafeScreen>
    </QueryClientProvider>
  );
}

const headerStyles = StyleSheet.create({
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
});
