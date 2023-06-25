import "./App.css";
import Memo from "./Memo.js";
import Form from "./Form.js";
import useMemos from "./useMemos";

const App = () => {
  const {
    text,
    setText,
    memos,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
  } = useMemos();

  return (
    <>
      <div className="memo-container">
        <ul>
          {memos.map((memo) => (
            <Memo key={memo.id} memo={memo} onEditClick={handleEdit} />
          ))}
          {memos.every((memo) => !memo.isEditing) && (
            <li>
              <div onClick={handleCreate} className="add-button">
                ＋
              </div>
            </li>
          )}
        </ul>
      </div>
      <Form
        isEditing={memos.some((memo) => memo.isEditing)}
        text={text}
        onUpdateChange={setText}
        onUpdateClick={handleUpdate}
        onDeleteClick={handleDelete}
      />
    </>
  );
};

export default App;
