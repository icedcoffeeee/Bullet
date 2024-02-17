import { Appearance } from "react-native";
import customConfig from "tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

export const THEME = resolveConfig(customConfig).theme;
export const COLORS = THEME.colors;

export const ISLIGHT = () => Appearance.getColorScheme() === "light";
export const BG_COLOR = () =>
  ISLIGHT() ? COLORS.primary[200] : COLORS.primary[900];
export const TX_COLOR = () =>
  ISLIGHT() ? COLORS.primary[900] : COLORS.primary[200];
