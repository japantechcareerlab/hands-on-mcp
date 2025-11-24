import { todos } from "../types.js";

export async function completeTodo(id: string) {
  if (!todos[id]) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Todo ${id} not found`,
        },
      ],
      isError: true,
    };
  }

  todos[id].completed = true;

  return {
    content: [
      {
        type: "text" as const,
        text: `Completed todo: ${todos[id].title}`,
      },
    ],
  };
}
