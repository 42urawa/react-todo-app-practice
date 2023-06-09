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
    setText("新規メモ");
    const maxId = todos.length ? Math.max(...todos.map((todo) => todo.id)) : 0;
    setTodos([
      ...todos,
      { id: maxId + 1, content: "新規メモ", isEditable: true },
    ]);
  };

  const handleEdit = (todoId) => {
    const editedTodos = todos.map((todo) => {
      if (todo.id === todoId) setText(todo.content);
      return { ...todo, isEditable: todo.id === todoId };
    });
    setTodos(editedTodos);
  };

  const handleUpdate = () => {
    const editedTodos = todos.map((todo) =>
      todo.isEditable ? { ...todo, isEditable: false, content: text } : todo
    );
    setTodos(editedTodos);
  };

  const handleDelete = () => {
    const deletedTodos = todos.filter((todo) => !todo.isEditable);
    setTodos(deletedTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

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
        <ul>
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                onEditClick={() => handleEdit(todo.id)}
              />
            );
          })}
          {todos.find((todo) => todo.isEditable) ? null : (
            <li>
              <div>
                <button onClick={handleCreate}>＋</button>
              </div>
            </li>
          )}
        </ul>
      </div>
      <Form
        isEditable={todos.some((todo) => todo.isEditable)}
        text={text}
        onUpdateChange={setText}
        onUpdateClick={handleUpdate}
        onDeleteClick={handleDelete}
      />
    </>
  );
};

export default App;
