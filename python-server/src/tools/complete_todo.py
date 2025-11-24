from ..types import todos


async def complete_todo(todo_id: str) -> str:
    if todo_id not in todos:
        return f"Todo {todo_id} not found"

    todos[todo_id].completed = True

    return f"Completed todo: {todos[todo_id].title}"
