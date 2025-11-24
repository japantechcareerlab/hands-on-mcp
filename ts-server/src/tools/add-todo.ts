import { todos } from "../types.js";

export async function addTodo(title: string, description?: string) {
  const id = crypto.randomUUID();
  todos[id] = { id, title, description, completed: false };

  return {
    content: [
      {
        type: "text" as const,
        text: `Added todo: ${title} (ID: ${id})`,
      },
    ],
  };
}
