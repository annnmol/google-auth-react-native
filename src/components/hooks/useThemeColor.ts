import { isDarkTheme, theme } from "../../lib/theme";

type ThemeProps = {
  light?: string;
  dark?: string;
};

type ThemeColorKey = keyof typeof theme;

export function useThemeColor(
  props: ThemeProps,
  colorKey: ThemeColorKey
): string {

    const colorScheme = isDarkTheme() ? "dark" : "light";
  // 1. First check if light/dark override is passed explicitly
  const overrideColor = props?.[colorScheme];

  // 2. If not, fallback to theme color by key
  return overrideColor ?? theme?.[colorKey] ?? theme["text"];
}
