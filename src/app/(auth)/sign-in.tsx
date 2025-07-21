import { useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Custom imports
import AppButton from "../../components/ui/button";
import AppText from "../../components/ui/text";

// Preload browser for better performance
export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

const Screen = () => {
  useWarmUpBrowser();
  
  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onGoogleSignIn = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For native, you must pass a scheme
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        // Navigation will be handled by the layout components
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
        console.log('Additional steps required', { signIn, signUp });
        Alert.alert('Authentication Error', 'Additional steps required to complete authentication.');
      }
    } catch (err: any) {
      console.error('OAuth error:', JSON.stringify(err, null, 2));
      Alert.alert('Sign-in Error', err.message || 'An error occurred during sign-in');
    }
  }, [startSSOFlow]);

  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>Welcome Back</AppText>
      <AppText style={styles.subtitle}>Sign in to continue</AppText>
      
      <AppButton onPress={onGoogleSignIn} style={styles.googleButton}>
        Sign in with Google
      </AppButton>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  googleButton: {
    marginTop: 20,
  },
});
