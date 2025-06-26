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

const markAsCompleted = async (todoId: number) => {
  const db = await AsyncStorage.getItem("db");

  if (!db) {
    return;
  }

  const parsedDb = JSON.parse(db);
  console.log("Parsed DB:", parsedDb);
  const updatedTodos = parsedDb.todos.map((todo: Todo) => {
    if (todo.id === todoId) {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }
    return todo;
  });

  await AsyncStorage.removeItem("db");

  console.log("Updated todos:", updatedTodos);

  await AsyncStorage.setItem(
    "db",
    JSON.stringify({ ...parsedDb, todos: updatedTodos })
  );

  return;
};

export { getTodos, markAsCompleted };
