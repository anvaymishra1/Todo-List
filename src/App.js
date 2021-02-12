import React ,{useState} from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from 'lodash';

function App() {
  const [state,setState] = useState({
    "todo": {
      title: "To-do",
      tiles: []
    },
    "inProgress": {
      title: "In Progress",
      tiles: []
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
          <Droppable droppableId = {key}>
            {(provided,snapshot)=>{
              return (
                <div 
                  ref = {provided.innerRef}
                  {...provided.droppableProps}
                  className = {"droppable-column"}
                >
                  
                </div>
              )
            }}
          </Droppable>
        )
      })}
      </DragDropContext>
    </div>
  );
}

export default App;
