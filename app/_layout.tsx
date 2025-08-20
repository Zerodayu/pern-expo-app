import SafeScreen from "@/components/SafeArea";
import { COLORS, THEMES } from "@/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CirclePlus, House } from "lucide-react-native";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeScreen>
        <StatusBar style={COLORS === THEMES.dark ? "light" : "dark"} /> 
        <Tabs screenOptions={{
        headerShown: false,
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
