import React, { useState } from "react";
import ToDoItem from "./tile";
import Heading from "./Heading";
import Footer from "./footer";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function handleTitleChange(event) {
    const newTitle = event.target.value;
    setEditTitle(newTitle);
  }

  function addItem() {
    if (editIndex !== null || editTitle === "" || inputText === "") {
      return;
    } else {
      setItems((prevItems) => [
        ...prevItems,
        { title: editTitle, text: inputText },
      ]);
      setInputText("");
      setEditTitle("");
    }
  }

  function deleteItem(id) {
    setItems((prevItems) => prevItems.filter((_, index) => index !== id));
  }

  function editItem(id) {
    setInputText(items[id].text);
    setEditTitle(items[id].title);
    setEditIndex(id);
  }

  function updateItem() {
    if (editIndex !== null) {
      items[editIndex] = { title: editTitle, text: inputText };
      setItems([...items]);
      setInputText("");
      setEditTitle("");
      setEditIndex(null);
    }
  }

  return (
    <>
      <Heading />

      <div className="container">
        <div className="form">
          <input
            style={{ width: "50%" }}
            onChange={handleTitleChange}
            type="text"
            value={editTitle}
            placeholder="Edit Title"
          />
          <input
            onChange={handleChange}
            type="text"
            value={inputText}
            placeholder="Edit Description"
          />

          {editIndex !== null ? (
            <button onClick={updateItem}>Save</button>
          ) : (
            <button onClick={addItem}>+</button>
          )}
        </div>
        <div>
          <ul>
            {items.map((item, index) => (
              <ToDoItem
                key={index}
                id={index}
                title={item.title}
                text={item.text}
                onChecked={deleteItem}
                onEdit={editItem}
              />
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
