import React,{useState} from 'react';
import store from '../store';
import "./Node.css";
import { useSelector } from 'react-redux';

const Node = (props) => {
    const {
        col,
        row,
    } = props;

    const isWall = useSelector(state => state.nodes[row*state.COLNUM+col].isWall);
    const isStart = useSelector(state => state.nodes[row*state.COLNUM+col].isStart);
    const isTarget = useSelector(state => state.nodes[row*state.COLNUM+col].isTarget);
    const isAdjusting = useSelector(state => state.isAdjusting);
    const isBomb = useSelector(state => state.nodes[row*state.COLNUM+col].isBomb);
    const isVisited = useSelector(state => state.nodes[row*state.COLNUM+col].isVisited);
    const isPath = useSelector(state => state.nodes[row*state.COLNUM+col].isPath);
    // const deletedProp = useSelector(state => state.deletedProp);
    let colNum=store.getState().COLNUM;

    const handleMouseOver = (event) =>{
        if(store.getState().isMouseDown===true){
            if(store.getState().isAdjusting)
                {console.log("adjusting");}
            else{
                store.dispatch({type:"SET_WALL",xCoordinates:col,yCoordinates:row});
                // store.dispatch({type:"ANIMATE_PATHFINDING",xCoordinates:col,yCoordinates:row});
                
            }
        }
    }
    const handleMouseDown=(event)=>{
        store.dispatch({type:"MOUSE_DOWN"});
        if(isStart){
            store.dispatch({type:"DELETE_START",xCoordinates:col,yCoordinates:row});
        }
        else if(isTarget){
            store.dispatch({type:"DELETE_TARGET",xCoordinates:col,yCoordinates:row});
        }
        else if(isBomb){
            store.dispatch({type:"DELETE_BOMB",xCoordinates:col,yCoordinates:row});
        }
        else{
            store.dispatch({type:"SET_WALL",xCoordinates:col,yCoordinates:row});
        }
      }
    
    const handleMouseUp=(event)=>{
        store.dispatch({type:"MOUSE_UP"});
        if(isAdjusting){
            store.dispatch({type:store.getState().deletedProp[0],xCoordinates:col,yCoordinates:row});
            console.log("start adjust finish");
        }
    }

    const classType = () => {
        let className = "node";
        if(isPath){
            className+=" node-shortest-path";
        }
        if(isBomb){
            store.dispatch({type:"DELETE_SIGNAL_WALL",xCoordinates:col,yCoordinates:row});
            className+=" node-bomb";
            return className;
        }
        if(isStart){
            store.dispatch({type:"DELETE_SIGNAL_WALL",xCoordinates:col,yCoordinates:row});
            className+=" node-start";
            return className;
        }
        if(isTarget){
            store.dispatch({type:"DELETE_SIGNAL_WALL",xCoordinates:col,yCoordinates:row});
            className+=" node-target";
            return className;
        }
        if(isWall){
            className+=" node-wall";
        }
        if(isVisited){
            className+=" node-visited";
        }
        return className;
    }

    return (
        <div
        key={`node-${row}-${col}`}
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={classType()}
        // className={`node ${isWall ? "node-wall" : ""} ${isStart ? "node-start" : ""} ${isTarget ? "node-target" : ""}`}
        ></div>
    );
}

export default Node;