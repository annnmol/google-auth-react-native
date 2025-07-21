import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

const ProtectedLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="home" />
    </Stack>
  );
};

export default ProtectedLayout;

export const unstable_settings = {
  // Ensure that the root layout is always mounted
  initialRouteName: "/home",
  // Use the new Expo Router API
  rootNavigation: true,
};
