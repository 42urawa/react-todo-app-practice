"user strict";

const useState = React.useState;

const App = () => {
  // const [text, setText] = useState("");
  const [memos, setMemos] = useState([
    { id: 1, content: "aaa" },
    { id: 2, content: "bbb" },
    { id: 3, content: "ccc" },
  ]);

  return (
    <React.Fragment>
      <Memo memos={memos} />
      <Form />
    </React.Fragment>
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

const Form = () => {
  return (
    <div>
      <input></input>
      <button>登録</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
