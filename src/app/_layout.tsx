import "@/global.css";
import { loadFonts } from "@/lib/font";
import { SplashScreen, Stack } from "expo-router";
import colors from "tailwindcss/colors";

SplashScreen.preventAutoHideAsync(); // hidden on font load

export default function Layout() {
  if (!loadFonts()) return null

  const pages = [{ name: "index" }, { name: "(tabs)" }];

  return (
    <Stack
      screenOptions={{
        statusBarStyle: "light",
        statusBarTranslucent: true,
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.neutral[900],
          flex: 1,
        },
      }}
    >
      {pages.map(({ name, ...others }, i) => (
        <Stack.Screen name={name} options={{ ...others }} key={i} />
      ))}
    </Stack>
  );
}
