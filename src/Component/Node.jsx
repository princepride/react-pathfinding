import React,{useState} from 'react';
import store from '../store';
import "./Node.css";
import { useSelector } from 'react-redux';

const Node = (props) => {
    const {
        col,
        row,
    } = props;

    const isAdjustingStart = false;
    const isAdjustingTarget = false;

    // const [isWall,setWall] = useState(false);
    const isWall = useSelector(state => state.nodes[row*state.COLNUM+col].isWall);
    const isStart = useSelector(state => state.nodes[row*state.COLNUM+col].isStart);
    const isTarget = useSelector(state => state.nodes[row*state.COLNUM+col].isTarget);
    const startCoordinates = useSelector(state => state.startCoordinates);
    const targetCoordinates = useSelector(state => state.targetCoordinates);
    let colNum=store.getState().COLNUM;

    const handleMouseOver = (event) =>{
        if(store.getState().isMouseDown===true&&!isAdjustingStart&&!isAdjustingTarget){
            store.dispatch({type:"SET_WALL",xCoordinates:col,yCoordinates:row});
            // setWall(true);
            // console.log(store.getState().nodes[row*colNum+col].isWall);
        }
    }
    const handleMouseDown=(event)=>{
        store.dispatch({type:"MOUSE_DOWN"});
        if(isStart===true){
            isAdjustingStart=true;
            isStart=false;
        }
        else if(isTarget===true){
            isAdjustingTarget=true;
            isTarget=false;
        }
        else{
            store.dispatch({type:"SET_WALL",xCoordinates:col,yCoordinates:row});
            console.log("mouse down");
        }
      }
    
    const handleMouseUp=(event)=>{
        store.dispatch({type:"MOUSE_UP"});
        if(isAdjustingStart){
            store.dispatch({type:"SET_START",xCoordinates:col,yCoordinates:row});
            isAdjustingStart=false;
        }
        else if(isAdjustingTarget){
            store.dispatch({type:"SET_TARGET",xCoordinates:col,yCoordinates:row});
            isAdjustingTarget=false;
        }
        console.log("mouse up");
    }

    const classType = () => {
        let className = "node";

        if(isStart){
            className+=" node-start";
            return className;
        }
        if(isTarget){
            className+=" node-target";
            return className;
        }
        if(isWall){
            className+=" node-wall";
            return className;
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