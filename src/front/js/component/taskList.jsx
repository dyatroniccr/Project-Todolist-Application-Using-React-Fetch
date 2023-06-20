import React, { useContext, useState, useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";

//Components
import { Context } from "../store/appContext";
//Styles
import "../../styles/todolist.css";

const TaskList = () => {
  const inputName = useRef(null);
  const { store, actions } = useContext(Context);
  const [refresh, setRefresh] = useState(false); //estado del compoenente para controlar su reenderizado

  useEffect(() => {
    //ejecutamos una función asíncrona que traerá la información de la lista de To Do
    const cargaDatos = async () => {
      actions.getToDoList();
    };
    cargaDatos();

    let limpiar = document.querySelector("#tarea");
    limpiar.value = "";
  }, [store.user, refresh]); //El componente se renderizará la primera vez y cada vez que el estado user o refresh cambien

  useEffect(() => {
    console.log(store.todoList);
  }, [store.todoList]);
  useEffect(() => {
    const cargaDatos = async () => {
      actions.getToDoList();
    };
    cargaDatos();
  }, [refresh]);
  //Declaracion de Variables
  const [tasks, setTasks] = useState([
    { id: 1, tarea: "Practicar React", done: false },
    { id: 2, tarea: "Ir al cine", done: false },
  ]);

  useEffect(() => {
    inputName.current.focus();
  }, []);

  const addNewTask = (newTaskName) => {
    setTasks([...tasks, { id: tasks.length, tarea: newTaskName, done: false }]);
  };

  //Funcion para eliminar un elemento
  const removeTask = (id) => {
    setTasks(
      tasks.filter((item, index) => {
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
            onKeyDown={(e) => {
              if (e.keyCode == "13") {
                console.log("Presionaste el Enter: ", e.target.value);
                addNewTask(e.target.value);
              }
            }}
          />
        </div>
        {tasks && tasks.length > 0 ? (
          <>
            {tasks.map((item, index) => (
              <>
                <div
                  key={item.id}
                  className="tarea border fs-3 ms-2 me-3 ps-5 pb-3 pt-3 d-flex justify-content-between"
                >
                  {item.tarea}
                  <button
                    type="button"
                    className="ocultar border border-0 me-2 "
                    style={{ width: 40, height: 40 }}
                    onClick={() => {
                      removeTask(index);
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </>
            ))}
            <div className="border text-black-50 ms-2 me-3 p-2 ">
              {" "}
              {tasks.length} item left
            </div>
          </>
        ) : (
          <>
            <div className="border ms-2 me-3 ps-5 pb-3 pt-3 d-flex justify-content-between">
              <h1>No hay tareas</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TaskList;
