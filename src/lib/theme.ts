import { Appearance } from "react-native";
import customConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { create } from "zustand";

export const THEME = resolveConfig(customConfig).theme;
export const COLORS = THEME.colors;

export const PRIMARY_LIGHT = COLORS.primary[200];
export const PRIMARY_DARK = COLORS.primary[900];

export type Theme = {
  theme: ReturnType<typeof Appearance.getColorScheme>;
  bg_color: string;
  tx_color: string;
  toggleTheme: () => void;
};
export const useTheme = create<Theme>(function (set) {
  return {
    theme: "light",
    bg_color: PRIMARY_LIGHT,
    tx_color: PRIMARY_DARK,
    toggleTheme: () =>
      set(function (state) {
        const isLight = state.theme === "light";
        const toggled = isLight ? "dark" : "light";
        Appearance.setColorScheme(state.theme);
        return {
          theme: toggled,
          bg_color: isLight ? PRIMARY_LIGHT : PRIMARY_DARK,
          tx_color: isLight ? PRIMARY_DARK : PRIMARY_LIGHT,
        };
      }),
  };
});
