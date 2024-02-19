import "@/global.css";
import { fontsLoaded } from "@/lib/fonts";
import { useTheme } from "@/lib/theme";
import { SplashScreen, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync(); // hidden on font load

export default function Layout() {
  const bg_color = useTheme((state) => state.bg_color);
  if (!fontsLoaded()) return null;

  const pages = [
    { name: "index", title: "" },
    { name: "(tabs)", title: "" },
  ];

  return (
    <Stack
      screenOptions={{
        statusBarTranslucent: true,
        headerShown: false,
        contentStyle: {
          backgroundColor: bg_color,
        },
      }}
    >
      {pages.map(({ name, title, ...others }, i) => (
        <Stack.Screen name={name} options={{ title, ...others }} key={i} />
      ))}
    </Stack>
  );
}
