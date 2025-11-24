from ..types import todos


async def list_todos(completed: bool | None = None) -> dict:
    filtered_todos = list(todos.values())

    if completed is not None:
        filtered_todos = [t for t in filtered_todos if t.completed == completed]

    if len(filtered_todos) == 0:
        return {
            "content": [
                {
                    "type": "text",
                    "text": "No todos found.",
                },
            ],
        }

    todo_list = "\n".join(
        f"[{'✓' if t.completed else ' '}] {t.title}{f' - {t.description}' if t.description else ''} (ID: {t.id})"
        for t in filtered_todos
    )

    return {
        "content": [
            {
                "type": "text",
                "text": f"Todos:\n{todo_list}",
            },
        ],
    }
