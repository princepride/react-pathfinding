import React ,{useState} from 'react';
import Node from './Node';
import "./GrideNodes.css";
import store from '../store';


const GrideNodes = (props) => {

    const[colNum]=useState(60);
    const[rowNum]=useState(20);
    const[isMouseDown,setMouseCondition]=useState(false);

    const handleMouseDown=(event)=>{
        setMouseCondition(true);
        console.log("mouse down");
      }
    
      const handleMouseUp=(event)=>{
        setMouseCondition(false);
        console.log("mouse up");
      }

    const createGride=()=>{
        const gride=[];
        store.dispatch({type:"INITIAL_NODES"});
        for(let i=0;i<rowNum;i++){
            const row=[];
            for(let j=0;j<colNum;j++){
                row.push(
                <Node 
                    key={store.getState().nodes[i*colNum+j].key}
                    col={store.getState().nodes[i*colNum+j].xCoordinates}
                    row={store.getState().nodes[i*colNum+j].yCoordinates}
                    // isMouseDown={isMouseDown}
                />);
            }
            gride.push(<div className="node-row" key={`row-${i}`}>{row}</div>);
        }

        return gride;
    }

    return(
        <div className="gride" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            {createGride()}
        </div>
    )
}

export default GrideNodes;