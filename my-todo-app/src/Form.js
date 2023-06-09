const Form = ({
  isEditing,
  text,
  onUpdateChange,
  onUpdateClick,
  onDeleteClick,
}) => {
  const handleUpdateChange = (e) => onUpdateChange(e.target.value);

  return (
    <div className="edit-container">
      {isEditing && (
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
