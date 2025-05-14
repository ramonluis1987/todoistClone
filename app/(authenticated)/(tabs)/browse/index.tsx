import { useAuth } from "@clerk/clerk-expo";
import { Button, Text, View } from "react-native";

const Page = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Button title="Sign Out" onPress={() => signOut()} />
      <Text>Browse</Text>
    </View>
  );
};

export default Page;
