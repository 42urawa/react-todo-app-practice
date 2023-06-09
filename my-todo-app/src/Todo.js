const Todo = ({ todo, onEditClick }) => {
  return (
    <li>
      {todo.isEditable ? (
        <>{todo.content.split("\n")[0]}</>
      ) : (
        <>
          <button onClick={onEditClick}>{todo.content.split("\n")[0]}</button>
        </>
      )}
    </li>
  );
};

export default Todo;
