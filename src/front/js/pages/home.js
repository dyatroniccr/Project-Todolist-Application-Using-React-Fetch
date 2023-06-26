import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { FaTrashAlt } from "react-icons/fa";

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

	const eliminarTask = async (i) => {
		let arrTemp = todos.filter((item, index) => {
			return index != i
		})
		
		let {respuestaJson, response } = await actions.useFetch("/todos/user/jmontero", arrTemp, "PUT")

		if(response.ok){
			setTodos(arrTemp) //reenderizando el componente	
		}else{
			alert("No se actualizo o no hubo conexion con la API")
		}
	}		
	return (
		<div className="container justify-content-cenert align-item-center">
			<div className="row d-flex justify-content-center">
				<input 
				    placeholder="Agregue una tarea nueva"
					onKeyDown={(e)=>{
						if(e.keyCode == "13"){
							console.log("Presionaste el Enter: ", e.target.value)
							setTodos([...todos, {tarea: e.target.value, done:false}])
						}
					}}
			    />
			</div>
			<div className="tarea row border fs-3 ms-2 me-3 ps-5 pb-3 pt-3 d-flex justify-content-between">
				{todos && todos.length > 0 ?
				    <>{todos.map((item, index)=> { //Funcion callback
					return <li key={index} className="d-flex justify-content-between">
						{item.label} -- {item.done ? "Realizada" : "Por Hacer"}
						Listo
						<button type="button"
						   className="ocultar border border-0 me-2" 
						   style={{ width: 40, height: 40 }}
						   onClick={() => {
							    eliminarTask(index)								
						}}					
					>
						<FaTrashAlt />
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
