import Fab from "@/app/components/Fab";
import { ScrollView, Text, View } from "react-native";

const Page = () => {
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Browse</Text>
        </View>
      </ScrollView>
      <Fab />
    </>
  );
};

export default Page;
