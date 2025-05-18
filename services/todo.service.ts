import Project from "@/types/project";
import Todo from "@/types/todo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getTodos = async () => {
  const db = await AsyncStorage.getItem("db");
  if (!db) {
    return [];
  }

  const parsedDb = JSON.parse(db);

  const todosWithProjects = parsedDb.todos.map((todo: Todo) => {
    const project = parsedDb.projects.find(
      (project: Project) => project.id === todo.project_id
    );
    return {
      ...todo,
      project,
    };
  });

  return todosWithProjects || [];
};

export { getTodos };
