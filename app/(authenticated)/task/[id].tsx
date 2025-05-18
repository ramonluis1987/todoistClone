import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
  const data = useLocalSearchParams();
  console.log("id", data);
  return (
    <View>
      <Text>Page: {data.id}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
