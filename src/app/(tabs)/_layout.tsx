import { icons } from "lucide-react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function Layout() {
  const { top } = useSafeAreaInsets();

  const pages: { name: string; icon: keyof typeof icons }[] = [
    { name: "day", icon: "Sun" },
    { name: "month", icon: "Moon" },
    { name: "year", icon: "Star" },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.neutral[800],
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarActiveBackgroundColor: colors.neutral[700],
      }}
      sceneContainerStyle={{
        backgroundColor: colors.neutral[900],
        padding: 20,
        paddingTop: 20 + top,
      }}
    >
      {pages.map(({ name, icon }, i) => (
        <Tabs.Screen
          name={name}
          options={{
            title: name,
            tabBarIcon({ color, size }) {
              const Icon = icons[icon];
              return <Icon color={color} size={size} />;
            },
          }}
          key={i}
        />
      ))}
    </Tabs>
  );
}
