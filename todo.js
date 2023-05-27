"user strict";

const useState = React.useState;

const Form = () => {
  const [text, setText] = useState("");
  const [memos, setMemos] = useState(initialData);
  const [editText, setEditText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCreate = (content) => {
    const maxId = memos
      .map((memo) => memo.id)
      .reduce((a, b) => Math.max(a, b), 0);
    setMemos([
      ...memos,
      { id: maxId + 1, content: content, isEditable: false },
    ]);
  };

  const handleEdit = (memoId) => {
    const editableMemos = memos.map((memo) => {
      if (memo.id === memoId) setEditText(memo.content);
      return { ...memo, isEditable: memo.id === memoId };
    });
    setMemos(editableMemos);
  };

  const handleDelete = (memoId) => {
    const newMemos = memos.filter((memo) => memo.id !== memoId);
    setMemos(newMemos);
  };

  return (
    <div>
      <input value={text} onChange={handleChange}></input>
      <button onClick={() => handleCreate(text)}>登録</button>
      <div>
        {memos.map((memo) => {
          return (
            <Memo
              memo={memo}
              a={(e) => {
                setEditText(e.target.value);
              }}
              t={editText}
              b={() => {
                const editedMemos = memos.map((memo) => {
                  if (memo.isEditable) {
                    return { ...memo, isEditable: false, content: editText };
                  } else {
                    return { ...memo };
                  }
                });
                setMemos(editedMemos);
              }}
              onEdit={() => handleEdit(memo.id)}
              onDelete={() => handleDelete(memo.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

const Memo = (props) => {
  return (
    <div key={props.memo.id}>
      {props.memo.isEditable ? (
        <div>
          <input value={props.t} onChange={props.a} />
          <br></br>
          <button onClick={props.b}>更新</button>
        </div>
      ) : (
        <div>
          <p>{props.memo.content}</p>
          <button onClick={props.onEdit}>編集</button>
          <button onClick={props.onDelete}>削除</button>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>
);

const initialData = [
  { id: 1, content: "ギャルのパンティもらう", isEditable: false },
  { id: 2, content: "タオパイパイを倒す", isEditable: false },
  { id: 3, content: "クリリンを生き返らせる", isEditable: false },
];
