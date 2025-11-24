from ..types import Todo, todos
import uuid


async def add_todo(title: str, description: str | None = None) -> str:
    todo_id = str(uuid.uuid4())
    todos[todo_id] = Todo(id=todo_id, title=title, description=description, completed=False)

    return f"Added todo: {title} (ID: {todo_id})"
