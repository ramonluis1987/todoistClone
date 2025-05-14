import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Stack } from "expo-router";
import { Image } from "react-native";

const Layout = () => {
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
    </Stack>
  );
};

const HeaderLeft = () => {
  const { user } = useUser();

  return (
    <Image
      source={{ uri: user?.imageUrl }}
      style={{ width: 40, height: 40, borderRadius: 20 }}
    />
  );
};

const HeaderRight = () => {
  return (
    <Link href="/browse/settings">
      <Ionicons name="settings-outline" size={24} />
    </Link>
  );
};

export default Layout;
