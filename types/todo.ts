import Project from "./project";

type Todo = {
  id: number;
  name: string;
  due_date?: number;
  description: string;
  priority: number;
  completed: number;
  project_id: number;
  date_added: number;
  date_completed?: number;
  project?: Project;
};

export default Todo;
