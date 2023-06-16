const Todo = ({ todo, onEditClick }) => (
  <li>
    {todo.isEditing ? (
      <div>{todo.content.split("\n")[0]}</div>
    ) : (
      <>
        <div onClick={onEditClick} className="todo-button">
          {todo.content.split("\n")[0]}
        </div>
      </>
    )}
  </li>
);

export default Todo;
