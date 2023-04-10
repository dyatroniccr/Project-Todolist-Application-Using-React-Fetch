import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/todolist.css"

export const Home = () => {
	//const arrTemp = ["Pasear al perro", "Ir al cine"]
	const[arrTemp, setArrTemp] = useState([
		{ tarea: "Pasear al perro", done: false},
		{ tarea: "Ir al cine", done:false }
		])
    
	const eliminarTarea = (indice) =>{
		setArrTemp(
			arrTemp.filter((item, index) => {
				return index != indice
		}))
	}

	useEffect(()=>{console.log("Se reenderizo el componente Home")},[arrTemp])
	
	return (
		<div className="container justify-content-cenert align-item-center">
			<div className="row d-flex justify-content-center">
				<input 
				    placeholder="Agregue una tarea nueva"
					onKeyDown={(e)=>{
						if(e.keyCode == "13"){
							console.log("Presionaste el Enter: ", e.target.value)
							setArrTemp([...arrTemp, {tarea: e.target.value, done:false}])
						}
					}}
			    />
			</div>
			<div className="row">
				{arrTemp && arrTemp.length > 0 ?
				    <>{arrTemp.map((item, index)=> { //Funcion callback
					return <li key={index} className="d-flex justify-content-between">
						{item.tarea} -- {item.done ? "Realizada" : "Por Hacer"}
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
				<><h1>No hay tareas</h1></>
				}
				Tareas
			</div>
		</div>
	);
};
