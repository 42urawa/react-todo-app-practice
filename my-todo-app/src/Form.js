const Form = (props) => {
  return (
    <div className="edit-container">
      {props.isEditable && (
        <>
          <div>
            <textarea value={props.text} onChange={props.onUpdateChange} />
          </div>
          <div className="button-container">
            <button onClick={props.onUpdateClick}>編集</button>
            <button onClick={props.onDeleteClick}>削除</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
