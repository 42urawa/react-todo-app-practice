const Memo = ({ memo, onEditClick }) => (
  <li>
    {memo.isEditing ? (
      <div>{memo.content.split("\n")[0]}</div>
    ) : (
      <>
        <div onClick={onEditClick} className="memo-button">
          {memo.content.split("\n")[0]}
        </div>
      </>
    )}
  </li>
);

export default Memo;
