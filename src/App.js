import React ,{useState} from 'react';
import './App.css';
import { DragDropContext } from "react-beautiful-dnd";
import _ from 'lodash';
import {v4} from "uuid";

import Column from './components/column/column';


const tile = {
  id: v4(),
  content: "Complete the project"
}

const tile2 = {
  id: v4(),
  content: "start the project"
}

function App() {
  const [text,setText] = useState(" ")
  const [state,setState] = useState({
    "todo": {
      title: "To-do",
      tiles: [tile]
    },
    "inProgress": {
      title: "In Progress",
      tiles: []
    },
    "completed": {
      title: "Completed",
      tiles: [tile2]
    }
  })

  const handleDragEnd = ({destination,source})=> {
    if(!destination){
      return
    }
    if(destination.index === source.index && destination.droppableId === source.droppableId){
      return
    }

    const copy = {...state[source.droppableId].tiles[source.index]}
    
    setState(prev => {
      prev = {...prev}
      prev[source.droppableId].tiles.splice(source.index,1)
      prev[destination.droppableId].tiles.splice(destination.index,0,copy)
      return prev
    })
  }

  const addTile = ()=>{
    setState(prev=>{
      return{
        ...prev,
        todo: {
          title: "To-Do",
          tiles: [
            {
            id: v4(),
            content: text
            },
          ...prev.todo.tiles
          ]
      }}
    })
    setText("")
    }
    

  return (
    <div className="App">
      <section className = "Container">
      <div className = "Task-Adder">
        <input type = "text" value = {text} onChange = {(e)=> setText(e.target.value)}>        
        </input>
        <button className = "button" onClick = {addTile}>Add</button>
      </div>
      <DragDropContext onDragEnd = {handleDragEnd}>
      {_.map(state,(data,key)=> {
        return (
          <Column data = {data} val = {key}></Column>
        )
      })}
      </DragDropContext>
      </section>
    </div>
    
  );
}

export default App;
