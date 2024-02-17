import "@/global.css";
import {
  useFonts,
  JosefinSans_400Regular,
} from "@expo-google-fonts/josefin-sans";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Appearance } from "react-native";

import customConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

export const THEME = resolveConfig(customConfig).theme;
export const COLORS = resolveConfig(customConfig).theme.colors;

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  Appearance.setColorScheme("dark");
  if (!fontsLoaded()) return null;

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

function fontsLoaded() {
  // Fonts
  const [fontsLoaded, fontError] = useFonts({
    JosefinSans_400Regular,
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return fontsLoaded;
}
