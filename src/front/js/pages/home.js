import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import "../../styles/todolist.css"

export const Home = () => {
	const {store, actions } = useContext(Context);
	const [todos, setTodos] = useState([]);

	useEffect(()=>{
		const cargaDatos = async () => {
			let {respuestaJson, response } = await actions.useFetch("/todos/user/jmontero")
			if(response.ok){
				setTodos(respuestaJson)
			}			
		}
		cargaDatos()
	},[])

    useEffect(()=>{},[todos])

	//useEffect(()=>{},[store.usuario])

	const[arrTask, setArrTask] = useState([
		{ tarea: "Pasear al perro", done: false},
		{ tarea: "Ir al cine", done:false }
		])
    
	const eliminarTarea = (indice) =>{
		setArrTask(
			arrTask.filter((item, index) => {
				return index != indice
		}))
	}

	
	
	return (
		<div className="container justify-content-cenert align-item-center">
			<div className="row d-flex justify-content-center">
				<input 
				    placeholder="Agregue una tarea nueva"
					onKeyDown={(e)=>{
						if(e.keyCode == "13"){
							console.log("Presionaste el Enter: ", e.target.value)
							setArrTask([...arrTask, {tarea: e.target.value, done:false}])
						}
					}}
			    />
			</div>
			<div className="row">
				{todos && todos.length > 0 ?
				    <>{todos.map((item, index)=> { //Funcion callback
					return <li key={index} className="d-flex justify-content-between">
						{item.label} -- {item.done ? "Realizada" : "Por Hacer"}
						<button 
						   className="ocultar" 
						   type="button"
						   onClick={() => {
							    eliminarTarea(index)								
						}}					
					>
							Eliminar
					</button>
					</li>
					})}
					</>
				:
				<><h1>Hola No hay tareas</h1></>
				}
				Tareas
			</div>
		</div>
	);
};
