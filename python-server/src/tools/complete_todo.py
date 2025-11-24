from ..types import todos


async def complete_todo(todo_id: str) -> dict:
    if todo_id not in todos:
        return {
            "content": [
                {
                    "type": "text",
                    "text": f"Todo {todo_id} not found",
                },
            ],
            "isError": True,
        }

    todos[todo_id].completed = True

    return {
        "content": [
            {
                "type": "text",
                "text": f"Completed todo: {todos[todo_id].title}",
            },
        ],
    }
