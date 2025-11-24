# Todo interface
from pydantic import BaseModel, Field
from typing import Annotated

TodoId = Annotated[str, Field(description="Todo ID to mark as complete")]
Title = Annotated[str, Field(description="Todo title")]
Description = Annotated[str, Field(description="Optional todo description")]
Completed = Annotated[bool, Field(description="Filter by completion status")]


class Todo(BaseModel):
    id: TodoId
    title: Title
    description: Description
    completed: Completed


# In-memory storage
todos: dict[str, Todo] = {}
