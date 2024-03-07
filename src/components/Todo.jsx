import React, { useState, useEffect } from "react";
/**
 * function ToDo(): -> JSX elements
 * 
 * Component of the React App
 * Describes the structure of HTML elements that will be rendered by React
 * 
 * @returns JSX elements of ToDo component
 * when rendered, translated into HTML elements
 * that are displayed on the web page
 */
function ToDo() {
    // useState - React Hook that adds a state variable to a component
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // useEffect - React Hook that synchronizing the component's state with local storage
    // load tasks from localStorage when component created and inserted into a DOM
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        // if there are tasks stored in the local storage,
        // sets them using setTasks
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []); // empty dependency array, only runs after the initial render

    // save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    
    /**
     * handleInputChange(event): event -> Void
     * 
     * on a given event updates setNewTask
     * @param {Event} event - Input change event
     * 
     */
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    /**
     * addTask(): -> Void
     * 
     * Adds a new task to the tasks list if it's not empty
     * Clears the newTask state after adding
     * 
     */
    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    /**
     * deleteTask(index): index -> Void
     * 
     * Deletes a task from the tasks list based on its index
     * @param {number} index - The index of the task to delete
     * 
     */
    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    /**
     * moveTaskUp(index): index -> Void
     * 
     * Moves a task up in the tasks list based on its index
     * @param {number} index - The index of the task to move up
     */
    function moveTaskUp(index){

        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    /**
     * moveTaskDown(index): index -> Void
     * 
     * Moves a task down in the tasks list based on its index
     * @param {number} index - The index of the task to move down
     */
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