import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: colors.neutral,
        secondary: colors.zinc[800],
        tertiary: colors.yellow[500],
      },
      fontFamily: {
        sans: ['JosefinSans_400Regular', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
} satisfies Config;
