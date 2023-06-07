"use strict";

const useState = React.useState;
const useEffect = React.useEffect;

const App = () => {
  const [newText, setNewText] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [editText, setEditText] = useState("");

  const handleCreate = () => {
    if (!newText) {
      return;
    }
    setNewText("");
    const maxId = todos.length ? Math.max(...todos.map((todo) => todo.id)) : 0;
    setTodos([...todos, { id: maxId + 1, content: newText, isEditing: false }]);
  };

  const handleEdit = (todoId) => {
    const editingTodos = todos.map((todo) => ({
      ...todo,
      isEditing: todo.id === todoId,
    }));
    setEditText(todos.find((todo) => todo.id === todoId).content);
    setTodos(editingTodos);
  };

  const handleCancel = () => {
    const canceledTodos = todos.map((todo) => ({ ...todo, isEditing: false }));
    setTodos(canceledTodos);
  };

  const handleUpdate = () => {
    if (!editText) {
      return;
    }
    const editedTodos = todos.map((todo) =>
      todo.isEditing ? { ...todo, isEditing: false, content: editText } : todo
    );
    setTodos(editedTodos);
  };

  const handleDelete = (todoId) => {
    const deletedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(deletedTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  return (
    <React.Fragment>
      <button
        onClick={() => {
          alert(localStorage.getItem("todos"));
        }}
      >
        ボタン（あとで消す）
      </button>

      <h1>
        <span>オラ</span> の TODO
      </h1>
      <div className="container">
        <div className="form-container">
          <Form
            newText={newText}
            onCreateChange={(e) => setNewText(e.target.value)}
            onCreateClick={handleCreate}
          />
        </div>
        <div className="todo-container">
          <ul>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onUpdateChange={(e) => {
                  setEditText(e.target.value);
                }}
                editText={editText}
                onCancelClick={handleCancel}
                onUpdateClick={handleUpdate}
                onEditClick={() => handleEdit(todo.id)}
                onDeleteClick={() => handleDelete(todo.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

const Form = ({ newText, onCreateChange, onCreateClick }) => {
  return (
    <React.Fragment>
      <input value={newText} onChange={onCreateChange} />
      <button onClick={onCreateClick}>登録</button>
    </React.Fragment>
  );
};

const Todo = ({
  todo,
  editText,
  onEditClick,
  onUpdateChange,
  onUpdateClick,
  onCancelClick,
  onDeleteClick,
}) => {
  return (
    <li>
      {todo.isEditing ? (
        <React.Fragment>
          <div>
            <input value={editText} onChange={onUpdateChange} />
          </div>
          <div>
            <button onClick={onCancelClick}>取消</button>
            <button onClick={onUpdateClick}>更新</button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div>
            <p>{todo.content}</p>
          </div>
          <div>
            <button onClick={onEditClick}>編集</button>
            <button onClick={onDeleteClick}>削除</button>
          </div>
        </React.Fragment>
      )}
    </li>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
