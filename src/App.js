import {React, useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import uuidv4 from '../node_modules/uuid/dist/v4.js'

//setup local storage
const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([])
  //getting name of todo in field
  const todoNameRef = useRef();

  //load todos
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos)
  },[])

  //store todos
  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleToDo(id){
    //create copy to modify
    const newTodos = [...todos]
    //match ID's to update
    const todo = newTodos.find(todo => todo.id ===id)
    todo.complete = !todo.complete //toggle it
    setTodos(newTodos) //pass em back
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    //setting todos, pulling in any previous from storage with prevTodos array.
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4() //uuid for uniqueness
        , name: name, complete: false}]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos(){
    //grab all non complete and overwrite list to that (removing completes)
    const newTodos = todos.filter(todo=> !todo.complete)
    setTodos(newTodos);
  }
  return (
    <>  
    <p>The most basic react app ever 💪</p>
    <TodoList todos={todos} toggleToDo={toggleToDo} />
    <input ref={todoNameRef} type="text"></input>
    <button onClick={handleAddTodo}>Add Item</button>
    <button onClick={handleClearTodos}>Clear Complete</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    <br></br>
    <div> <a href='https://www.youtube.com/watch?v=hQAHSlTtcmY'>Courtesy of web dev simplified</a></div>
    </>
  )
}

export default App;
