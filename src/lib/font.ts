import {
  JosefinSans_400Regular,
  useFonts,
} from "@expo-google-fonts/josefin-sans";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export function loadFonts() {
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
