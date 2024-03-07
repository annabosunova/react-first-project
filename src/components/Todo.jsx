import React, { useState, useEffect } from "react";

function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Load tasks from localStorage when component mounts
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){

        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){

        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }


    return(<div className="to-do-list">
        <h1>To-Do List</h1>

        <div>
            <input 
            type="text" 
            placeholder="Enter a task" 
            value={newTask}
            onChange={handleInputChange}/>
            
            <button 
            className="add-button" 
            onClick={addTask}>
                Add 
                </button> 
        </div>

        <ol>
            {tasks.map((task,index) =>
            <li key={index}>
                <span 
                className="text"
                >{task}</span>
            
                <button
                className="move-up"
                onClick={() => moveTaskUp(index)}>
                 ↑
                </button>

                <button
                className="move-down"
                onClick={() => moveTaskDown(index)}>
                 ↓
                </button>
                <button 
                className="delete-button" 
                onClick={() => deleteTask(index)}> 
                x
                </button>

            </li>)}
        </ol>


    </div>);
}
export default ToDo