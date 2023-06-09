const Todo = ({ todo, onEditClick }) => (
  <li>
    {todo.isEditing ? (
      <>{todo.content.split("\n")[0]}</>
    ) : (
      <>
        <button onClick={onEditClick}>{todo.content.split("\n")[0]}</button>
      </>
    )}
  </li>
);

export default Todo;
