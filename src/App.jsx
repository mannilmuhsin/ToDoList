import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTudos] = useState(() => {
    const localvalue = localStorage.getItem("ITEMS");
    if (localvalue == null) return [];
    return JSON.parse(localvalue);
  });

  const [todo, setTudo] = useState("");

  const [editTodo, seteditTodo] = useState(null);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (editTodo) {
      setTudo(editTodo.text);
    } else {
      setTudo("");
    }
  }, [editTodo, setTudo]);

  const updatetodo = (todo, id, completed) => {
    const newtodo = todos.map((ntodo) => {
      if (ntodo.id === id) {
        return { text: todo, completed: completed, id: id };
      } else {
        return ntodo;
      }
    });
    setTudos(newtodo);
    seteditTodo("");
  };
  const createdittodo = (obj) => {
    const findtodo = todos.find((todo) => todo.id === obj.id);
    seteditTodo(findtodo);
  };
  
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={todo}
          onChange={(e) => setTudo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() => {
            if (!editTodo) {
              setTudos([
                ...todos,
                { text: todo, completed: false, id: crypto.randomUUID() },
              ]);
              setTudo("");
            } else {
              updatetodo(todo, editTodo.id, editTodo.completed);
            }
          }}
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {todos.length === 0 && (
          <p style={{ color: "red", marginTop: 10 }}>NO TODOs ..!</p>
        )}
        {todos.map((obj) => {
          return (
            <div key={obj.id} className="todo">
              <div className="left">
                <input
                  onChange={(e) => {
                    setTudos(
                      todos.map((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.completed = e.target.checked;
                        }
                        return obj2;
                      })
                    );
                  }}
                  type="checkbox"
                  name=""
                  id=""
                  checked={obj.completed}
                />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <i
                  onClick={() => {
                    createdittodo(obj);
                  }}
                  className="fa fa-pencil"
                  aria-hidden="true"
                  style={{ fontSize: "15px", marginRight: "10px" }}
                ></i>
                <i
                  onClick={() =>
                    setTudos(todos.filter((obj2) => obj2.id !== obj.id))
                  }
                  className="fas fa-times"
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
