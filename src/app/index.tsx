import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";

const Index = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(protected)/home" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
};

export default Index;
