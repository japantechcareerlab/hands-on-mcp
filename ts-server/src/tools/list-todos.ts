import { todos } from "../types.js";

export async function listTodos(completed?: boolean) {
  let filteredTodos = Object.values(todos);

  if (completed !== undefined) {
    filteredTodos = filteredTodos.filter((t) => t.completed === completed);
  }

  if (filteredTodos.length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: "No todos found.",
        },
      ],
    };
  }

  const todoList = filteredTodos
    .map((t) => {
      const status = t.completed ? "✓" : " ";
      const desc = t.description ? ` - ${t.description}` : "";
      return `[${status}] ${t.title}${desc} (ID: ${t.id})`;
    })
    .join("\n");

  return {
    content: [
      {
        type: "text" as const,
        text: `Todos:\n${todoList}`,
      },
    ],
  };
}
