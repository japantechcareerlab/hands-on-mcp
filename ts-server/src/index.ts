import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Define Todo interface
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

// In-memory storage
const todos: Record<string, Todo> = {};

// Create server instance
const server = new Server(
  {
    name: "mcp-todo-server-ts",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

// List Resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "todo://list",
        name: "Todo List",
        mimeType: "application/json",
        description: "The current list of todos",
      },
      ...Object.keys(todos).map((id) => ({
        uri: `todo://${id}`,
        name: `Todo: ${todos[id].title}`,
        mimeType: "application/json",
        description: "Details of a specific todo",
      })),
    ],
  };
});

// Read Resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const url = new URL(request.params.uri);

  if (url.protocol !== "todo:") {
    throw new McpError(ErrorCode.InvalidRequest, "Invalid protocol");
  }

  if (url.pathname === "//list") {
    // Handle todo://list
    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: "application/json",
          text: JSON.stringify(Object.values(todos), null, 2),
        },
      ],
    };
  }

  // Handle todo://{id}
  // The URI format is todo://{id}, so pathname might be empty or //id depending on parsing
  // Let's parse manually
  const id = request.params.uri.replace("todo://", "");

  if (id === "list") {
    // Should be handled above but just in case
    return {
      contents: [
        {
          uri: request.params.uri,
          mimeType: "application/json",
          text: JSON.stringify(Object.values(todos), null, 2),
        },
      ],
    };
  }

  const todo = todos[id];
  if (!todo) {
    throw new McpError(ErrorCode.InvalidRequest, `Todo ${id} not found`);
  }

  return {
    contents: [
      {
        uri: request.params.uri,
        mimeType: "application/json",
        text: JSON.stringify(todo, null, 2),
      },
    ],
  };
});

// List Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "add_todo",
        description: "Add a new todo",
        inputSchema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
          },
          required: ["title"],
        },
      },
      {
        name: "list_todos",
        description: "List all todos with optional filtering",
        inputSchema: {
          type: "object",
          properties: {
            completed: { type: "boolean" },
          },
        },
      },
      {
        name: "update_todo",
        description: "Update a todo's title or description",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "complete_todo",
        description: "Mark a todo as complete",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "uncomplete_todo",
        description: "Mark a todo as incomplete",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
      },
      {
        name: "delete_todo",
        description: "Remove a todo",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
      },
    ],
  };
});

// Call Tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "add_todo") {
    const schema = z.object({
      title: z.string(),
      description: z.string().optional(),
    });
    const { title, description } = schema.parse(args);
    const id = crypto.randomUUID();
    todos[id] = { id, title, description, completed: false };
    return {
      content: [{ type: "text", text: `Added todo: ${title} (ID: ${id})` }],
    };
  }

  if (name === "list_todos") {
    const schema = z.object({
      completed: z.boolean().optional(),
    });
    const { completed } = schema.parse(args);

    let filteredTodos = Object.values(todos);
    if (completed !== undefined) {
      filteredTodos = filteredTodos.filter((t) => t.completed === completed);
    }

    if (filteredTodos.length === 0) {
      return {
        content: [{ type: "text", text: "No todos found." }],
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
      content: [{ type: "text", text: `Todos:\n${todoList}` }],
    };
  }

  if (name === "update_todo") {
    const schema = z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
    });
    const { id, title, description } = schema.parse(args);

    if (!todos[id]) {
      throw new McpError(ErrorCode.InvalidRequest, `Todo ${id} not found`);
    }

    if (title !== undefined) {
      todos[id].title = title;
    }
    if (description !== undefined) {
      todos[id].description = description;
    }

    return {
      content: [{ type: "text", text: `Updated todo: ${todos[id].title}` }],
    };
  }

  if (name === "complete_todo") {
    const schema = z.object({ id: z.string() });
    const { id } = schema.parse(args);
    if (!todos[id]) {
      throw new McpError(ErrorCode.InvalidRequest, `Todo ${id} not found`);
    }
    todos[id].completed = true;
    return {
      content: [{ type: "text", text: `Completed todo: ${todos[id].title}` }],
    };
  }

  if (name === "uncomplete_todo") {
    const schema = z.object({ id: z.string() });
    const { id } = schema.parse(args);
    if (!todos[id]) {
      throw new McpError(ErrorCode.InvalidRequest, `Todo ${id} not found`);
    }
    todos[id].completed = false;
    return {
      content: [{ type: "text", text: `Marked todo as incomplete: ${todos[id].title}` }],
    };
  }

  if (name === "delete_todo") {
    const schema = z.object({ id: z.string() });
    const { id } = schema.parse(args);
    if (!todos[id]) {
      throw new McpError(ErrorCode.InvalidRequest, `Todo ${id} not found`);
    }
    const deletedTitle = todos[id].title;
    delete todos[id];
    return {
      content: [{ type: "text", text: `Deleted todo: ${deletedTitle}` }],
    };
  }

  throw new McpError(ErrorCode.MethodNotFound, `Tool ${name} not found`);
});

// List Prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "summarize_todos",
        description: "Summarize pending todos",
      },
    ],
  };
});

// Get Prompt
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name === "summarize_todos") {
    const pending = Object.values(todos).filter((t) => !t.completed);
    if (pending.length === 0) {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: "There are no pending todos. Ask the user what they want to do next.",
            },
          },
        ],
      };
    }

    let summary = "The user has the following pending todos:\n";
    for (const t of pending) {
      summary += `- ${t.title}`;
      if (t.description) summary += `: ${t.description}`;
      summary += "\n";
    }
    summary += "\nPlease summarize these tasks and suggest a priority order.";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: summary,
          },
        },
      ],
    };
  }
  throw new McpError(
    ErrorCode.MethodNotFound,
    `Prompt ${request.params.name} not found`
  );
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
