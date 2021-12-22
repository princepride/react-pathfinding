import React,{useState} from 'react';
import store from '../store';
import "./Node.css";
import { useSelector } from 'react-redux';

const Node = (props) => {
    const {
        col,
        row,
    } = props;

    // let isAdjustingStart = false;
    // let isAdjustingTarget = false;

    // const [isWall,setWall] = useState(false);
    const isWall = useSelector(state => state.nodes[row*state.COLNUM+col].isWall);
    const isStart = useSelector(state => state.nodes[row*state.COLNUM+col].isStart);
    const isTarget = useSelector(state => state.nodes[row*state.COLNUM+col].isTarget);
    const isAdjustingTarget = useSelector(state => state.isAdjustingTarget);
    const isAdjustingStart = useSelector(state => state.isAdjustingStart);
    // const startCoordinates = useSelector(state => state.start);
    // const targetCoordinates = useSelector(state => state.target);
    let colNum=store.getState().COLNUM;

    const handleMouseOver = (event) =>{
        if(store.getState().isMouseDown===true){
            if(store.getState().isAdjustingStart||store.getState().isAdjustingTarget){console.log("adjusting");}
            else{
                store.dispatch({type:"SET_WALL",xCoordinates:col,yCoordinates:row});
            }
            // setWall(true);
            // console.log(store.getState().nodes[row*colNum+col].isWall);
        }
    }
    const handleMouseDown=(event)=>{
        store.dispatch({type:"MOUSE_DOWN"});
        if(isStart){
            // isAdjustingStart=true;
            store.dispatch({type:"DELETE_START",xCoordinates:col,yCoordinates:row});
            console.log("start adjust");
        }
        else if(isTarget){
            // isAdjustingTarget=true;
            store.dispatch({type:"DELETE_TARGET",xCoordinates:col,yCoordinates:row});
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
            // isAdjustingStart=false;
            console.log("start adjust finish");
        }
        else if(isAdjustingTarget){
            store.dispatch({type:"SET_TARGET",xCoordinates:col,yCoordinates:row});
            // isAdjustingTarget=false;
        }
        console.log("mouse up");
    }

    const classType = () => {
        let className = "node";
        if(isWall){
            className+=" node-wall";
        }
        if(isStart){
            className+=" node-start";
            return className;
        }
        if(isTarget){
            className+=" node-target";
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