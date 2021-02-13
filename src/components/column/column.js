import React from 'react'
import {  Droppable } from "react-beautiful-dnd";

import Tile from '../tile/tile'

import './column.css'

function Column({data,val}) {
    return (
        <div  key = {val} className= {"column"}>
            <h3>{data.title}</h3>
            <Droppable droppableId = {val}>
                {(provided,snapshot)=>{
                return (
                <div 
                    ref = {provided.innerRef}
                    {...provided.droppableProps}
                    className = {"droppable-column"}
                >
                    {data.tiles.map((ele , index )=>{
                    return(
                        <Tile ele = {ele} index = {index} ></Tile>
                    )
                    })}
                    {provided.placeholder}
                </div>
                )
            }}
            </Droppable>
        </div>
    )
}

export default Column
