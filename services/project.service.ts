import AsyncStorage from "@react-native-async-storage/async-storage";

const getProjects = async () => {
  const db = await AsyncStorage.getItem("db");
  if (!db) {
    return [];
  }

  const parsedDb = JSON.parse(db);

  return parsedDb.projects || [];
};

const deleteProject = async (projectId: number) => {
  const db = await AsyncStorage.getItem("db");
  if (!db) {
    return;
  }

  const parsedDb = JSON.parse(db);
  const updatedProjects = parsedDb.projects.filter(
    (project: { id: number }) => project.id !== projectId
  );

  await AsyncStorage.setItem(
    "db",
    JSON.stringify({ ...parsedDb, projects: updatedProjects })
  );
  return updatedProjects;
};

export { deleteProject, getProjects };
