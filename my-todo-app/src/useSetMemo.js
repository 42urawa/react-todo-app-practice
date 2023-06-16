import { useState } from "react";

const useSetMemo = (initialData) => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(initialData);

  const customCreate = () => {
    const maxId = todos.length ? Math.max(...todos.map((todo) => todo.id)) : 0;
    setText("新規メモ");
    setTodos([
      ...todos,
      { id: maxId + 1, content: "新規メモ", isEditing: true },
    ]);
  };
  // const customUpdate = () => {};
  // const customDelete = () => {};

  return {
    customCreate,
    // customUpdate,
    // customDelete,
  };
};

export default useSetMemo;

// const handleEdit = (todoId) => {
//   const targetTodo = todos.find((todo) => todo.id === todoId);
//   const editedTodos = todos.map((todo) => ({
//     ...todo,
//     isEditing: todo.id === todoId,
//   }));
//   setText(targetTodo.content);
//   setTodos(editedTodos);
// };

// const handleUpdate = () => {
//   if (!text) return;
//   const editedTodos = todos.map((todo) =>
//     todo.isEditing ? { ...todo, content: text, isEditing: false } : todo
//   );
//   setText("");
//   setTodos(editedTodos);
// };

// const handleDelete = () => {
//   const deletedTodos = todos.filter((todo) => !todo.isEditing);
//   setTodos(deletedTodos);
// };
