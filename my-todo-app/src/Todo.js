const Todo = (props) => {
  return (
    <li key={props.todo.id}>
      {props.todo.isEditable ? (
        <>
          <div>
            <input value={props.editText} onChange={props.handleUpdateChange} />
          </div>
          <div>
            <button onClick={props.onCancelClick}>取消</button>
            <button onClick={props.onUpdateClick}>更新</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>{props.todo.content}</p>
            <button>{props.todo.content}</button>
          </div>
          <div>
            <button onClick={props.onEditClick}>編集</button>
            <button onClick={props.onDeleteClick}>削除</button>
          </div>
        </>
      )}
    </li>
  );
};

export default Todo;
