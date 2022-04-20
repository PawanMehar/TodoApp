import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import "./style/todo.scss";
const TodoContainer = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   let arr = [1, 2, 3].map((e) => {
  //     let arr2 = [6, 7].map((x) => {
  //       let obj = {};
  //       obj.title = x + " child";
  //       obj.done = true;
  //       return obj;
  //     });
  //     let obj = {};
  //     obj.title = e + " parent";
  //     obj.done = false;
  //     obj.childs = [...arr2];
  //     obj.show = true;
  //     return obj;
  //   });
  //   setList([...arr]);
  // }, []);
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    let obj = {};
    obj.title = value;
    obj.done = false;
    obj.childs = [];
    obj.show = true;
    let arr = [...list];
    arr.push(obj);
    setList([...arr]);
    setValue("");
  };
  const addNewChild = (value, i) => {
    let arr = list.map((item, ind) => {
      if (i === ind) {
        let obj = item;
        let newChild = {};
        newChild.title = value;
        newChild.done = false;
        obj.childs.push(newChild);
        return obj;
      }
      return item;
    });
    setList([...arr]);
  };

  const handleChecked = (childId, parentId, key) => {
    let arr = list.map((item, ind) => {
      if (parentId === ind) {
        let arr = item.childs.map((child, i) => {
          // childId will be null in case parent is clicked
          if (childId !== null) {
            if (childId === i) child.done = !child.done;
          } else {
            child.done = !item.done;
          }
          return child;
        });
        // let filtered = item.childs.filter((child, i) => i !== childId);
        if (childId === null) item.done = !item.done;
        // if (key === "remove") item.child = [...filtered];
      }
      return item;
    });
    setList([...arr]);
  };

  const handleShow = (id) => {
    let arr = list.map((item, i) => {
      if (i === id) {
        item.show = !item.show;
      }
      return item;
    });
    setList([...arr]);
  };

  const handleRemoveItem = (i, id, key) => {
    let arr;
    if (key === "child") {
      arr = list.map((item, index) => {
        if (index === id) {
          let filtered = item.childs.filter((_, ind) => ind !== i);
          item.childs = [...filtered];
        }
        return item;
      });
    } else {
      arr = list.filter((item, i) => i !== id);
    }
    setList([...arr]);
  };

  return (
    <div className="App">
      <div>
        <h1>Todo App</h1>
      </div>
      <div className="addTodo">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter your next todo"
        />
        <button onClick={handleClick}>New List</button>
      </div>
      {list.length ? (
        list.map((item, i) => (
          <TodoList
            data={item}
            handleCallback={addNewChild}
            key={i}
            id={i}
            handleCheckedCallback={handleChecked}
            handleShowCallback={handleShow}
            removeItem={handleRemoveItem}
          />
        ))
      ) : (
        <h2 className="nodata">Add some todos</h2>
      )}
    </div>
  );
};
export default TodoContainer;
