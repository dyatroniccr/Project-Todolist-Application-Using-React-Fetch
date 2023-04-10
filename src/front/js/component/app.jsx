import React, { useEffect, useState, useRef } from "react";

//Components
import TaskList from "./taskList.jsx";
//<div className="container-todo-shadow1 row d-flex justify-content-center">

//Styles
import "../../styles/todolist.css"

const App = () => {
    const headerStyle = { textAlign: "center", verticalAlign: "middle" };

    return (        
        <div className="container principal">
            <div className="container-header">
                <h1 className="titulo opacity-25" style={ headerStyle } >todos</h1>
            </div>
            <div className="d-flex flex-column ms-5 me-5 justify-content-center">
                              
                <TaskList />
            </div>       
        </div>   
          
    );
};


export default App;