// Todo interface
export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

// In-memory storage
export const todos: Record<string, Todo> = {};
