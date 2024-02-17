import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Appearance } from "react-native";

import customConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

export const COLORS = resolveConfig(customConfig).theme.colors;

export default function Layout() {

  const pages = [
    { name: "index", title: "" },
    { name: "(tabs)", title: "" },
  ];

  return (
    <Stack
      screenOptions={{
        statusBarColor: "dark",
        statusBarTranslucent: true,
        headerShown: false,
        contentStyle: {
          backgroundColor: BG_COLOR(),
        },
      }}
    >
      {pages.map(({ name, title }, i) => (
        <Stack.Screen name={name} options={{ title }} key={i} />
      ))}
    </Stack>
  );
}

export const ISLIGHT = () => Appearance.getColorScheme() === "light";
export const BG_COLOR = () =>
  ISLIGHT() ? COLORS.primary[200] : COLORS.primary[900];
export const TX_COLOR = () =>
  ISLIGHT() ? COLORS.primary[900] : COLORS.primary[200];
