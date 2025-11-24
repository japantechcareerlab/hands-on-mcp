import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { addTodo } from "./tools/add-todo.js";
import { listTodos } from "./tools/list-todos.js";
import { completeTodo } from "./tools/complete-todo.js";

// Create server instance
const server = new McpServer({
  name: "mcp-todo-server-ts",
  version: "0.1.0",
});

// Register Tools
server.registerTool(
  "add_todo",
  {
    title: "Add Todo",
    description: "Add a new todo item",
    inputSchema: {
      title: z.string().describe("Todo title"),
      description: z.string().optional().describe("Optional todo description"),
    },
  },
  async ({ title, description }) => addTodo(title, description)
);

server.registerTool(
  "list_todos",
  {
    title: "List Todos",
    description: "List all todos with optional filtering",
    inputSchema: {
      completed: z.boolean().optional().describe("Filter by completion status"),
    },
  },
  async ({ completed }) => listTodos(completed)
);

server.registerTool(
  "complete_todo",
  {
    title: "Complete Todo",
    description: "Mark a todo as complete",
    inputSchema: {
      id: z.string().describe("Todo ID to mark as complete"),
    },
  },
  async ({ id }) => completeTodo(id)
);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
