import { useClerk, useUser } from "@clerk/clerk-expo";
import React, { useMemo } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Custom imports
import AppButton from "../../components/ui/button";
import AppText from "../../components/ui/text";

const getNameAvatar = (fullName: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    fullName
  )}&background=007AFF&color=fff&size=80`;
};

const Screen = () => {
  const { user } = useUser();

  console.log(`🚀 ~ Screen ~ user:`, user);

  const { signOut } = useClerk();

  const fullName = useMemo(
    () => user?.firstName || user?.emailAddresses[0]?.emailAddress || "User",
    [user]
  );

  const handleSignOut = async () => {
    try {
      await signOut();
      // Navigation will be handled by the layout components
    } catch (err: any) {
      console.error("Sign out error:", err);
      Alert.alert(
        "Sign-out Error",
        err.message || "An error occurred during sign-out"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>Welcome Home!</AppText>

      {user && (
        <View style={styles.userProfile}>
          {/* User Avatar */}
          <Image
            source={{
              uri: user.imageUrl || getNameAvatar(fullName),
            }}
            style={styles.avatar}
          />

          {/* User Info */}
          <View style={styles.userInfo}>
            <AppText style={styles.userName} numberOfLines={1}>
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.firstName ||
                  user.emailAddresses[0]?.emailAddress ||
                  "User"}
            </AppText>

            {user.emailAddresses[0]?.emailAddress && (
              <AppText style={styles.email}>
                {user.emailAddresses[0].emailAddress}
              </AppText>
            )}
          </View>
        </View>
      )}

      <AppButton onPress={handleSignOut} style={styles.signOutButton}>
        Sign Out
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
    fontWeight: "bold",
    marginBottom: 32,
  },
  userProfile: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  signOutButton: {
    marginTop: 20,
  },
});
