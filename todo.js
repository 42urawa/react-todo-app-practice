"use strict";

const useState = React.useState;

const App = () => {
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
    <React.Fragment>
      <h1>
        <span>オラ</span> の TODO
      </h1>
      <div className="container">
        <div className="form-container">
          <Form
            createText={createText}
            onCreateChange={(e) => setCreateText(e.target.value)}
            onCreateClick={() => handleCreate(createText)}
          />
        </div>
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
      </div>
    </React.Fragment>
  );
};

const Form = (props) => {
  return (
    <React.Fragment>
      <input value={props.createText} onChange={props.onCreateChange} />
      <button onClick={props.onCreateClick}>登録</button>
    </React.Fragment>
  );
};

const Todo = (props) => {
  return (
    <li key={props.todo.id}>
      {props.todo.isEditable ? (
        <React.Fragment>
          <div>
            <input value={props.editText} onChange={props.handleUpdateChange} />
          </div>
          <div>
            <button onClick={props.onCancelClick}>取消</button>
            <button onClick={props.onUpdateClick}>更新</button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div>
            <p>{props.todo.content}</p>
          </div>
          <div>
            <button onClick={props.onEditClick}>編集</button>
            <button onClick={props.onDeleteClick}>削除</button>
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
