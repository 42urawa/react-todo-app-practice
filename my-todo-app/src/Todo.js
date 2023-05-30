const Todo = (props) => {
  return (
    <li key={props.todo.id}>
      {props.todo.isEditable ? (
        <>{props.todo.content.split("\n")[0]}</>
      ) : (
        <>
          <button onClick={props.onEditClick}>
            {props.todo.content.split("\n")[0]}
          </button>
        </>
      )}
    </li>
  );
};

export default Todo;
