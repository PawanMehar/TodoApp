import { useState } from "react";
import deleteIcon from "../../../../assets/icons/delete.svg";
const TodoList = (props) => {
  const {
    data,
    handleCallback,
    id,
    handleCheckedCallback,
    handleShowCallback,
    removeItem
  } = props;
  const { title, done, childs, show } = data;
  const [newChild, setNewChild] = useState("");
  let childCount = childs.length;
  let checkedCount = childs.filter((child) => child.done).length;
  console.log(title);

  const handleChange = (e) => {
    setNewChild(e.target.value);
  };

  const addNewChild = () => {
    if (newChild) handleCallback(newChild, id);
    setNewChild("");
  };

  const handleChecked = (i = null, e) => {
    // i is null in case parent is clicked
    console.log(e);
    if (e) e.stopPropagation();
    handleCheckedCallback(i, id);
  };

  const handleShow = () => {
    handleShowCallback(id);
  };

  const handleRemoveItem = (key, i, e) => {
    if (e) e.stopPropagation();
    removeItem(i, id, key);
  };
  return (
    <div className="todoList">
      <div className="parentItem" onClick={handleShow}>
        <div className="parent">
          <div className="title">
            <input
              type="checkbox"
              checked={done}
              onClick={(e) => handleChecked(null, e)}
              className="parentInput"
            />
            <h4>{title}</h4>
          </div>
          <div onClick={(e) => handleRemoveItem("parent", null, e)}>
            <img src={deleteIcon} alt="delete" />
          </div>
        </div>
        <div className="todoCount">
          <span>
            {checkedCount} of {childCount} completed
          </span>
          <img src="" alt="" />
        </div>
      </div>
      {show && (
        <div className="childContainer">
          {childs.length !== 0 &&
            childs.map((child, i) => (
              <div className="childItem">
                <input
                  type="checkbox"
                  checked={child.done}
                  onChange={() => handleChecked(i)}
                  className="childCheckbox"
                />
                <p>{child.title}</p>
                <div onClick={() => handleRemoveItem("child", i)}>
                  <img src={deleteIcon} alt="delete" />
                </div>
              </div>
            ))}
          <div className="addChild">
            <input
              type="text"
              value={newChild}
              onChange={handleChange}
              placeholder="Enter child todo here"
            />
            <button onClick={addNewChild}>New child</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
