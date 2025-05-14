import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const Fab = () => {
  const router = useRouter();
  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/task/new");
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons
        name="add"
        size={24}
        color="white"
        style={{ textAlign: "center" }}
      />
    </TouchableOpacity>
  );
};

export default Fab;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: Colors.primary,
    zIndex: 1000,
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
});
