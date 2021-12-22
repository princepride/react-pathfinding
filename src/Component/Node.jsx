import React,{useState} from 'react';
import store from '../store';
import "./Node.css";

const Node = (props) => {
    const {
        col,
        row,
    } = props;

    const [isWall,setWall] = useState(false);
    let colNum=store.getState().COLNUM;

    const onMouseOver = (event) =>{
        if(store.getState().isMouseDown===true){
            store.dispatch({type:"SET_WALL",xCoordinates:col,yCoordinates:row});
            setWall(true);
            // console.log(store.getState().nodes[row*colNum+col].isWall);
        }

    }

    return (
        <div
        key={`node-${row}-${col}`}
        onMouseOver={onMouseOver}
        // className={'node'}
        className={`node ${isWall ? "node-wall" : ""}`}
        // className={`node ${store.getState().isMouseDown ? "node-wall" : ""}`}
        ></div>
    );
}

export default Node;