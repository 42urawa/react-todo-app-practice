"user strict";

const useState = React.useState;

const Form = () => {
  const [text, setText] = useState("");
  const [memos, setMemos] = useState(initialData);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCreate = (content) => {
    const memoIds = memos.map((memo) => memo.id);
    setMemos([...memos, { id: Math.max(...memoIds) + 1, content: content }]);
  };

  const handleEdit = () => {
    console.log("hi");
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
              onEdit={handleEdit}
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
    <div key={props.memo.id} className="memo-container">
      <p>{props.memo.content}</p>
      <button onClick={props.onEdit}>編集</button>
      <button onClick={props.onDelete}>削除</button>
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
  { id: 1, content: "aaa" },
  { id: 2, content: "bbb" },
  { id: 3, content: "ccc" },
];
