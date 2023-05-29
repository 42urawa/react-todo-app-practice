import Todo from "./Todo.js";
import { useState } from "react";

const Form = () => {
  const [createText, setCreateText] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [editText, setEditText] = useState("");

  const handleCreate = (content) => {
    setCreateText("");
    const maxId = todos
      .map((todo) => todo.id)
      .reduce((a, b) => Math.max(a, b), 0);
    setTodos([
      ...todos,
      { id: maxId + 1, content: content, isEditable: false },
    ]);
    localStorage.setItem(
      "todos",
      JSON.stringify([
        ...todos,
        { id: maxId + 1, content: content, isEditable: false },
      ])
    );
  };

  const handleEdit = (todoId) => {
    const editableTodos = todos.map((todo) => {
      if (todo.id === todoId) setEditText(todo.content);
      return { ...todo, isEditable: todo.id === todoId };
    });
    setTodos(editableTodos);
  };

  const handleCancel = () => {
    const cancelTodos = todos.map((todo) => {
      return { ...todo, isEditable: false };
    });
    setTodos(cancelTodos);
  };

  const handleUpdate = () => {
    const editedTodos = todos.map((todo) => {
      if (todo.isEditable) {
        return { ...todo, isEditable: false, content: editText };
      } else {
        return { ...todo };
      }
    });
    setTodos(editedTodos);
    localStorage.setItem("todos", JSON.stringify(editedTodos));
  };

  const handleDelete = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <>
      <div className="container">
        <div className="todo-container">
          <ul>
            {todos.map((todo) => {
              return (
                <Todo
                  todo={todo}
                  handleUpdateChange={(e) => {
                    setEditText(e.target.value);
                  }}
                  editText={editText}
                  onCancelClick={handleCancel}
                  onUpdateClick={handleUpdate}
                  onEditClick={() => handleEdit(todo.id)}
                  onDeleteClick={() => handleDelete(todo.id)}
                />
              );
            })}
          </ul>
        </div>
        <div className="create-form-container">
          <input
            value={createText}
            onChange={(e) => setCreateText(e.target.value)}
          ></input>
          <button onClick={() => handleCreate(createText)}>登録</button>
        </div>
      </div>
    </>
  );
};

export default Form;
