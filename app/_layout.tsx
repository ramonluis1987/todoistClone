import { Colors } from "@/constants/Colors";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { Toaster } from "sonner-native";

import { projects } from "@/data/projects";
import { todos } from "@/data/todos";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const router = useRouter();
  const segments = useSegments();
  const pathName = usePathname();

  useEffect(() => {
    const initializeDb = async () => {
      const data = {
        todos,
        projects,
      };

      const db = await AsyncStorage.getItem("db");

      if (!db) {
        await AsyncStorage.setItem("db", JSON.stringify(data));
      }
    };

    initializeDb();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/today");
    } else if (!isSignedIn && pathName !== "/") {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, pathName, segments, router]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <Suspense
          fallback={<ActivityIndicator size="large" color={Colors.primary} />}
        >
          <PaperProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Toaster />
              <InitialLayout />
            </GestureHandlerRootView>
          </PaperProvider>
        </Suspense>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
