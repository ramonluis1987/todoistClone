import Todo from "@/types/todo";

const todos: Todo[] = [
  {
    id: 1,
    name: "Check out Galaxies.dev for epic React Native courses",
    description: "And learn how to build your own apps",
    priority: 1,
    completed: 0,
    project_id: 1,
    date_added: Date.now(),
    due_date: Date.now() + 86400000, // 1 day from now
  },
  {
    id: 2,
    name: "Buy groceries for the week",
    description: "And learn how to build your own apps",
    priority: 2,
    completed: 0,
    project_id: 2,
    date_added: Date.now(),
    due_date: Date.now() + 86400000, // 1 day from now
  },
];

export { todos };
