from mcp.server.fastmcp import FastMCP
from src.types import TodoId, Title, Description, Completed
from src.tools import add_todo as add_todo_impl, list_todos as list_todos_impl, complete_todo as complete_todo_impl

# Create server instance
mcp = FastMCP(name="mcp-todo-server-python")

# Register Tools
@mcp.tool(
    title="Add Todo",
)
async def add_todo(
    title: Title,
    description: Description = ""
) -> dict:
    """Add a new todo item"""
    return await add_todo_impl(title, description)


@mcp.tool(
    title="List Todos",
)
async def list_todos(
    completed: Completed = False
) -> dict:
    """List all todos with optional filtering"""
    return await list_todos_impl(completed)


@mcp.tool(
    title="Complete Todo",
)
async def complete_todo(
    todo_id: TodoId
) -> dict:
    """Mark a todo as complete"""
    return await complete_todo_impl(todo_id)


# Run with streamable HTTP transport
if __name__ == "__main__":
    mcp.run(transport="streamable-http")
