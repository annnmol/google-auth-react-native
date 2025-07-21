import { forwardRef, memo, useMemo } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  type StyleProp,
  type TextProps,
} from "react-native";

// custom imports
import { ThemeKeys } from "../../lib/theme";
import { useThemeColor } from "../hooks/useThemeColor";

// Responsive text configuration
const BASE_WIDTH = 375;
const MAX_SCALE = 1.15;
const MIN_SCALE = 0.95;

const screenWidth = Dimensions.get("window").width;
const screenScale = screenWidth / BASE_WIDTH;

const getResponsiveText = (size: number): number => {
  const clamped = Math.min(Math.max(screenScale, MIN_SCALE), MAX_SCALE);
  return Math.round(size * clamped);
};

// Text style variants as constants
const TEXT_VARIANTS = {
  default: {
    fontSize: getResponsiveText(16),
    lineHeight: getResponsiveText(24),
    fontFamily: "Satoshi",
    fontWeight: "400" as TextStyle["fontWeight"],
  },
  defaultSemiBold: {
    fontSize: getResponsiveText(16),
    lineHeight: getResponsiveText(24),
    fontFamily: "Satoshi",
    fontWeight: "600" as TextStyle["fontWeight"],
  },
  title: {
    fontSize: getResponsiveText(28),
    lineHeight: getResponsiveText(36),
    fontFamily: "Satoshi",
    fontWeight: "700" as TextStyle["fontWeight"],
  },
  heading: {
    fontSize: getResponsiveText(24),
    lineHeight: getResponsiveText(32),
    fontFamily: "Satoshi",
    fontWeight: "700" as TextStyle["fontWeight"],
  },
  subtitle: {
    fontSize: getResponsiveText(18),
    lineHeight: getResponsiveText(28),
    fontFamily: "Satoshi",
    fontWeight: "700" as TextStyle["fontWeight"],
  },
  link: {
    fontSize: getResponsiveText(16),
    lineHeight: getResponsiveText(24),
    fontFamily: "Satoshi",
    fontWeight: "600" as TextStyle["fontWeight"],
    color: "royalblue",
  },
  caption: {
    fontSize: getResponsiveText(14),
    lineHeight: getResponsiveText(20),
    fontFamily: "Satoshi",
    fontWeight: "400" as TextStyle["fontWeight"],
  },
  captionSemiBold: {
    fontSize: getResponsiveText(14),
    lineHeight: getResponsiveText(20),
    fontFamily: "Satoshi",
    fontWeight: "600" as TextStyle["fontWeight"],
  },
  small: {
    fontSize: getResponsiveText(12),
    lineHeight: getResponsiveText(16),
    fontFamily: "Satoshi",
    fontWeight: "300" as TextStyle["fontWeight"],
  },
} as const;

// Create StyleSheet from variants for performance
export const textStyles = StyleSheet.create(TEXT_VARIANTS);

export type TextVariant = keyof typeof TEXT_VARIANTS;

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  themeKey?: ThemeKeys;
  lightColor?: string;
  darkColor?: string;
};

const AppText = memo(
  forwardRef<Text, AppTextProps>(
    (
      {
        variant = "default",
        themeKey = "text",
        style,
        lightColor,
        darkColor,
        ...rest
      },
      ref
    ) => {
      const resolvedColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        themeKey
      );

      const baseStyle = TEXT_VARIANTS[variant];

      // Handle optional color from variant (like link variant)
      const finalColor = "color" in baseStyle ? baseStyle.color : resolvedColor;

      const combinedStyle = useMemo<StyleProp<TextStyle>>(
        () => [textStyles[variant], { color: finalColor }, style],
        [variant, finalColor, style]
      );

      return <Text ref={ref} style={combinedStyle} {...rest} />;
    }
  )
);

AppText.displayName = "AppText";

export default AppText;
