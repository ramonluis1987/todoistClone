import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { Button, Image, TouchableOpacity } from "react-native";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.backgroundAlt },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Browse",
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          presentation: "modal",
          headerTransparent: true,
          headerRight: () => (
            <Button
              title="Done"
              onPress={() => router.dismiss()}
              color={Colors.primary}
            />
          ),
        }}
      />
      <Stack.Screen
        name="new-project"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const HeaderLeft = () => {
  const { user } = useUser();

  return (
    <Image
      source={{ uri: user?.imageUrl }}
      style={{ width: 32, height: 32, borderRadius: 16 }}
    />
  );
};

const HeaderRight = () => {
  return (
    <Link href="/browse/settings" asChild>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </Link>
  );
};

export default Layout;
