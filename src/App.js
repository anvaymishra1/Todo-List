import React ,{useState} from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from 'lodash';
import {v4} from "uuid"


const tile = {
  id: v4(),
  content: "Complete the project"
}

const tile2 = {
  id: v4(),
  content: "start the project"
}

function App() {
  const [state,setState] = useState({
    "todo": {
      title: "To-do",
      tiles: [tile]
    },
    "inProgress": {
      title: "In Progress",
      tiles: [tile2]
    },
    "completed": {
      title: "Completed",
      tiles: []
    }
  })
  return (
    <div className="App">
      <DragDropContext onDragEnd = {e => console.log(e)}>
      {_.map(state,(data,key)=> {
        return (
          <div  key = {key} className= {"column"}>
            <h3>{data.title}</h3>
          <Droppable droppableId = {key}>
            {(provided,snapshot)=>{
              return (
                <div 
                  ref = {provided.innerRef}
                  {...provided.droppableProps}
                  className = {"droppable-column"}
                >
                  {data.tiles.map((ele :T, index :num)=>{
                    return(
                      <Draggable key = {ele.id} index = {index} draggableId = {ele.id}>
                        {(provided) => {
                          return (
                            <div
                              ref = {provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              >
                                {ele.content}
                            </div>
                          )
                        }}
                      </Draggable>
                    )
                  })}
                </div>
              )
            }}
          </Droppable>
          </div>
        )
      })}
      </DragDropContext>
    </div>
  );
}

export default App;
