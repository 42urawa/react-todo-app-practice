const Form = ({
  isEditable,
  text,
  onUpdateChange,
  onUpdateClick,
  onDeleteClick,
}) => {
  const handleUpdateChange = (e) => onUpdateChange(e.target.value);

  return (
    // <>
    //   <div className="edit-container">
    //     {props.todos.map((todo) => {
    //       if (todo.isEditable) {
    //         return (
    //           <>
    //             <div>
    //               <textarea
    //                 value={props.text}
    //                 onChange={props.onUpdateChange}
    //               />
    //             </div>
    //             <div className="button-container">
    //               <button onClick={props.onUpdateClick}>編集</button>
    //               <button onClick={props.onDeleteClick}>削除</button>
    //             </div>
    //           </>
    //         );
    //       } else {
    //         return <></>;
    //       }
    //     })}
    //   </div>
    // </>
    <div className="edit-container">
      {isEditable && (
        <>
          <div>
            <textarea value={text} onChange={handleUpdateChange} />
          </div>
          <div className="button-container">
            <button onClick={onUpdateClick}>編集</button>
            <button onClick={onDeleteClick}>削除</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
