import "./App.css";
import Memo from "./Memo.js";
import Form from "./Form.js";
// import { useState, useEffect } from "react";
import useMemos from "./useMemos";

const App = () => {
  const {
    text,
    setText,
    memos,
    customCreate,
    customEdit,
    customUpdate,
    customDelete,
  } = useMemos();

  return (
    <>
      <div className="memo-container">
        {/* <button
          onClick={() => {
            localStorage.removeItem("todos");
          }}
        >
          リセットボタン
        </button> */}
        <button
          onClick={() => {
            window.alert(localStorage.getItem("todos"));
          }}
        >
          状態確認ボタン
        </button>
        <ul>
          {memos.map((memo) => (
            <Memo
              key={memo.id}
              memo={memo}
              onEditClick={() => customEdit(memo.id)}
            />
          ))}
          {memos.every((memo) => !memo.isEditing) && (
            <li>
              <div>
                <div onClick={customCreate} className="add-button">
                  ＋
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
      <Form
        isEditing={memos.some((memo) => memo.isEditing)}
        text={text}
        onUpdateChange={setText}
        onUpdateClick={customUpdate}
        onDeleteClick={customDelete}
      />
    </>
  );
};

export default App;
