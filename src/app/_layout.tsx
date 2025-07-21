import { Stack } from "expo-router";
import React from "react";
import GlobalContextProvider from "../components/providers/global-providers";

const Layout = () => {
  return (
    <GlobalContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(protected)" />
      </Stack>
    </GlobalContextProvider>
  );
};

export default Layout;

export const unstable_settings = {
  // Ensure that the root layout is always mounted
  initialRouteName: "/index",
  // Use the new Expo Router API
  rootNavigation: true,
};
