import React from 'react'

export default function Todo({todo, toggleToDo}) {
  function handleToDoClick(){
      toggleToDo(todo.id)
  }
  return (
    <div>
        <label>
            <input type="checkbox" checked={todo.complete} 
            onChange={handleToDoClick} /> 
            {todo.name}
        </label>
    </div>
  )
}