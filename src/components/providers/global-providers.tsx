import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, createContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated"; //do not remove this

//custom imports

interface IGlobalContext {}

export const GlobalContext = createContext({} as IGlobalContext);

const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalContext.Provider value={{}}>
        <StatusBar style={"light"} />
        <ThemeProvider value={DefaultTheme}>
          <ClerkProvider 
            publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
            tokenCache={tokenCache}
          >
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </GlobalContext.Provider>
    </GestureHandlerRootView>
  );
};

export default GlobalContextProvider;
