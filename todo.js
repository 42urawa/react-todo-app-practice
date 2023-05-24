"user strict";

const useState = React.useState;

const Form = () => {
  const [text, setText] = useState("hello");
  const [memos, setMemos] = useState(initialData);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCreate = (content) => {
    setMemos([...memos, { id: memos.length + 1, content: content }]);
  };

  return (
    <div>
      <input value={text} onChange={handleChange}></input>
      <button onClick={() => handleCreate(text)}>登録</button>
      <Memo memos={memos} />
    </div>
  );
};

const Memo = (props) => {
  return (
    <div>
      {props.memos.map((memo) => {
        return (
          <div key={memo.id} className="memo-container">
            <p>{memo.content}</p>
            <button>編集</button>
            <button>削除</button>
          </div>
        );
      })}
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
