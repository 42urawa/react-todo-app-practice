import "./App.css";
import Todo from "./Todo.js";
import Form from "./Form.js";
import { useState } from "react";

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
    const editableTodos = todos.map((todo) => {
      if (todo.id === todoId) setText(todo.content);
      return { ...todo, isEditable: todo.id === todoId };
    });
    setTodos(editableTodos);
  };

  const handleUpdate = () => {
    const editedTodos = todos.map((todo) => {
      if (todo.isEditable) {
        return { ...todo, isEditable: false, content: text };
      } else {
        return { ...todo };
      }
    });
    setTodos(editedTodos);
    localStorage.setItem("todos", JSON.stringify(editedTodos));
  };

  const handleDelete = () => {
    const deletedTodos = todos.filter((todo) => !todo.isEditable);
    setTodos(deletedTodos);
    localStorage.setItem("todos", JSON.stringify(deletedTodos));
  };

  return (
    <>
      <div className="todo-container">
        <ul>
          {todos.map((todo) => {
            return <Todo todo={todo} onEditClick={() => handleEdit(todo.id)} />;
          })}
          {todos.every((todo) => !todo.isEditable) && (
            <li>
              <div>
                <button onClick={handleCreate}>＋</button>
              </div>
            </li>
          )}
        </ul>
      </div>
      <Form
        todos={todos}
        text={text}
        onUpdateChange={(e) => {
          setText(e.target.value);
        }}
        onUpdateClick={handleUpdate}
        onDeleteClick={handleDelete}
      />
    </>
  );
};

export default App;
