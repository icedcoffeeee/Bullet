import "@/global.css";
import { fontsLoaded } from "@/lib/fonts";
import { BG_COLOR } from "@/lib/theme";
import { SplashScreen, Stack } from "expo-router";
import { Appearance } from "react-native";

SplashScreen.preventAutoHideAsync(); // hidden on font load

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
      {pages.map(({ name, title, ...others }, i) => (
        <Stack.Screen name={name} options={{ title, ...others }} key={i} />
      ))}
    </Stack>
  );
}
