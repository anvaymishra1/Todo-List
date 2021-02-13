import React ,{useState} from 'react';
import './App.css';
import { DragDropContext } from "react-beautiful-dnd";
import _ from 'lodash';
import {v4} from "uuid";

import Column from './components/column/column';




const tileGenerator = (tileArray, num)=>{
  let val = [...tileArray]
  for (let index = 0; index < num; index++) {
    val.push({
      id:v4(),
      content: "lorem ipsum"
    })
  }
  val.push({
    id:v4(),
    content: "lorem ipsum"
  })
  return val;
}

function App() {
  const [text,setText] = useState(" ")
  const [state,setState] = useState({
    "todo": {
      title: "To-do",
      tiles: tileGenerator([],5)
    },
    "inProgress": {
      title: "In Progress",
      tiles: tileGenerator([],7)
    },
    "completed": {
      title: "Completed",
      tiles: tileGenerator([],5)
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
    if(text === "")
    return
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
      <section className = "Heading"> <span>To Do Application</span></section>
      <section className = "Container">
      <div className = "Task-Adder">
        <input className = "Task-Adder-Text" type = "text" value = {text} onChange = {(e)=> setText(e.target.value)}>        
        </input>
        <button className = "button" onClick = {addTile}>Add a new task</button>
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
