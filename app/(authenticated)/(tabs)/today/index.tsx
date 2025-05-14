import Fab from "@/app/components/Fab";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text>todadddy</Text>
      <Fab />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
  },
});
