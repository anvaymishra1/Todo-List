import React  from 'react';
import {  Draggable } from "react-beautiful-dnd";



import './tile.css'

function Tile({ele,index}) {
                return (
                    <Draggable key={ele.id} index={index} draggableId={ele.id}>
                        {(provided, snapshot) => {
                            return (
                                <div
                                className={`tile ${snapshot.isDragging && "dragging"}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                {ele.content}
                                </div>
                            );
                        }}
                </Draggable>
                );
}

export default Tile;
