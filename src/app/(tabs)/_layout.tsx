import { COLORS, THEME, useTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const { theme, bg_color, tx_color } = useTheme(
    ({ theme, bg_color, tx_color }) => ({ theme, bg_color, tx_color }),
  );
  const { top } = useSafeAreaInsets();

  const pages: {
    name: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    { name: "index", title: "Daily", icon: "sunny" },
    { name: "month", title: "Month", icon: "moon" },
    { name: "year", title: "Year", icon: "calendar" },
    { name: "settings", title: "Settings", icon: "settings" },
  ];

  return (
    <Tabs
      sceneContainerStyle={{
        padding: 20,
        paddingTop: 20 + top,
        backgroundColor: bg_color,
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tx_color,
        tabBarStyle: {
          backgroundColor: COLORS.primary[theme === "light" ? 700 : 300],
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { fontFamily: THEME.fontFamily.sans[0] },
      }}
    >
      {pages.map(({ name, title, icon }, i) => (
        <Tabs.Screen
          name={name}
          options={{
            title,
            tabBarIcon({ color, size }) {
              return <Ionicons name={icon} color={color} size={size} />;
            },
          }}
          key={i}
        />
      ))}
    </Tabs>
  );
}
