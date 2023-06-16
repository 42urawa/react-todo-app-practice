import "./App.css";
import Todo from "./Todo.js";
import Form from "./Form.js";
import { useState, useEffect } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const handleCreate = () => {
    const maxId = todos.length ? Math.max(...todos.map((todo) => todo.id)) : 0;
    setText("新規メモ");
    setTodos([
      ...todos,
      { id: maxId + 1, content: "新規メモ", isEditing: true },
    ]);
  };

  const handleEdit = (todoId) => {
    const targetTodo = todos.find((todo) => todo.id === todoId);
    const editedTodos = todos.map((todo) => ({
      ...todo,
      isEditing: todo.id === todoId,
    }));
    setText(targetTodo.content);
    setTodos(editedTodos);
  };

  const handleUpdate = () => {
    if (!text) return;
    const editedTodos = todos.map((todo) =>
      todo.isEditing ? { ...todo, content: text, isEditing: false } : todo
    );
    setText("");
    setTodos(editedTodos);
    localStorage.setItem("todos", JSON.stringify(editedTodos));
  };

  const handleDelete = () => {
    const deletedTodos = todos.filter((todo) => !todo.isEditing);
    setTodos(deletedTodos);
    localStorage.setItem("todos", JSON.stringify(deletedTodos));
  };

  return (
    <>
      <div className="todo-container">
        {/* <button
          onClick={() => {
            localStorage.removeItem("todos");
          }}
        >
          リセットボタン
        </button> */}
        {/* <button
          onClick={() => {
            window.alert(localStorage.getItem("todos"));
          }}
        >
          状態確認ボタン
        </button> */}
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onEditClick={() => handleEdit(todo.id)}
            />
          ))}
          {todos.every((todo) => !todo.isEditing) && (
            <li>
              <div>
                <div onClick={handleCreate} className="add-button">
                  ＋
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
      <Form
        isEditing={todos.some((todo) => todo.isEditing)}
        text={text}
        onUpdateChange={setText}
        onUpdateClick={handleUpdate}
        onDeleteClick={handleDelete}
      />
    </>
  );
};

export default App;
