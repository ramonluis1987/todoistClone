import AsyncStorage from "@react-native-async-storage/async-storage";

const getProjects = async () => {
  const db = await AsyncStorage.getItem("db");
  if (!db) {
    return [];
  }

  const parsedDb = JSON.parse(db);

  return parsedDb.projects || [];
};

export { getProjects };
