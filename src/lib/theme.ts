import { Appearance } from "react-native";

// custom imports
import colorTokens from "../../tokens/colors.json";

type ThemeMode = "light" | "dark";

// 👇 Helper to flatten design tokens
const getFlattenedColors = <T extends Record<string, { value: string }>>(
  palette: T
) => {
  return Object.fromEntries(
    Object.entries(palette).map(([key, val]) => [key, val.value])
  ) as {
    [K in keyof T]: T[K]["value"];
  };
};

// 👇 Detect current theme
const systemPreference = Appearance.getColorScheme() ?? "light";

const colorScheme: ThemeMode = systemPreference === "dark" ? "dark" : "light";

// 👇 Flattened color theme with full TS support
export const theme = getFlattenedColors(colorTokens[colorScheme]);

export type ThemeTypeMap = typeof theme;
export type ThemeKeys = keyof ThemeTypeMap;

export const isDarkTheme = (): boolean => colorScheme === "dark";

// Get color + opacity version
export const getThemeColorWithOpacity = (
  key: ThemeKeys,
  opacity: number
): string => {
  const rgb = theme[key]
    ?.replace("rgb(", "")
    ?.replace(")", "")
    ?.split(",")
    ?.map((n) => parseInt(n.trim()));

  const [r, g, b] = rgb;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
