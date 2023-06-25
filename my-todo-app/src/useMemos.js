import { useState, useEffect } from "react";

const useMemos = () => {
  const [text, setText] = useState("");
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos"));
    if (data) setMemos(data);
  }, []);

  const saveToLocalStorage = (memos) => {
    localStorage.setItem("todos", JSON.stringify(memos));
  };

  const customCreate = () => {
    const maxId = memos.length
      ? Math.max(...memos.map((memo) => memo.id)) + 1
      : 0;
    const newMemo = { id: maxId, content: "新規メモ", isEditing: true };
    const newMemos = [...memos, newMemo];
    setText("新規メモ");
    setMemos([...memos, newMemo]);
    saveToLocalStorage(newMemos);
  };

  const customEdit = (memoId) => {
    const targetMemo = memos.find((memo) => memo.id === memoId);
    const updatedMemos = memos.map((memo) => ({
      ...memo,
      isEditing: memo.id === memoId,
    }));
    setText(targetMemo.content);
    setMemos(updatedMemos);
  };

  const customUpdate = () => {
    if (!text) return;
    const editedMemos = memos.map((memo) =>
      memo.isEditing ? { ...memo, content: text, isEditing: false } : memo
    );
    setText("");
    setMemos(editedMemos);
    saveToLocalStorage(editedMemos);
  };

  const customDelete = () => {
    const deletedMemos = memos.filter((memo) => !memo.isEditing);
    setMemos(deletedMemos);
    saveToLocalStorage(deletedMemos);
  };

  return {
    text,
    setText,
    memos,
    customCreate,
    customEdit,
    customUpdate,
    customDelete,
  };
};

export default useMemos;
