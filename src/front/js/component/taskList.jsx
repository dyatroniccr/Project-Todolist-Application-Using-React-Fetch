import React, { useContext, useState, useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";

//Components
import { Context } from "../store/appContext";
//Styles
import "../../styles/todolist.css";

const TaskList = () => {
  const inputName = useRef(null);
  const { store, actions } = useContext(Context);
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    //ejecutamos una función asíncrona que traerá la información de la lista de To Do
    const cargaDatos = async () => {
      actions.getToDoList();
    };
    cargaDatos();

    let limpiar = document.querySelector("#tarea");
    //limpiar.value = "";
  }, [store.user, todos]); //El componente se renderizará la primera vez y cada vez que el estado user o refresh cambien

  useEffect(() => {}, [store.todoList]);

  useEffect(() => {
    inputName.current.focus();
  }, []);

  //Funcion para eliminar un elemento
  const removeTask = (id) => {
    setTodos(
      todos.filter((item, index) => {
        return index != id;
      })
    );
  };

  return (
    <>
      <div className="">
        <div className="border ms-2 me-3 ps-5 pb-3 pt-3 d-flex justify-content-between">
          <input
            type="text"
            ref={inputName}
            name="name"
            className="fs-4"
            placeholder="What needs to be done?"
            onKeyDown={async (e) => {
              if (e.keyCode == "13") {
                console.log("Presionaste el Enter: ", e.target.value);
                //addNewTask(e.target.value);
                let resultado = await actions.agregarToDo(e.target.value);
                if (resultado) {
                  setTodos(!todos);
                  e.target.value = ""; //restauro el valor a vacío
                }
              }
            }}
          />
        </div>

        {store.todoList && store.todoList.length > 0 ? (
          <>
            {store.todoList.map((item, index) => (
              <>
                <div
                  key={index}
                  className="tarea border fs-3 ms-2 me-3 ps-5 pb-3 pt-3 d-flex justify-content-between"
                >
                  {item.label}
                  <button
                    type="button"
                    className="ocultar border border-0 me-2 "
                    style={{ width: 40, height: 40 }}
                    onClick={() => {
                      //removeTask(index);
                      actions.eliminarToDo(index);
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </>
            ))}
            <div className="border text-black-50 ms-2 me-3 p-2 ">
              {" "}
              {store.todoList.length} item left
            </div>
          </>
        ) : (
          <>
            <div className="border ms-2 me-3 ps-5 pb-3 pt-3 d-flex justify-content-between">
              <h1>No hay tareas.</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TaskList;
