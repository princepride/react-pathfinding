import React from 'react';
import Node from './Node';
import "./GrideNodes.css";
import store from '../store';


const GrideNodes = (props) => {

    const handleMouseDown=(event)=>{
        store.dispatch({type:"MOUSE_DOWN"});
        console.log("mouse down");
      }
    
      const handleMouseUp=(event)=>{
        store.dispatch({type:"MOUSE_UP"});
        console.log("mouse up");
      }

    const createGride=()=>{
        const gride=[];
        let colNum=store.getState().COLNUM;
        let rowNum=store.getState().ROWNUM;
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

    const initGride=()=>{
        store.dispatch({type:"INITIAL_NODES"});
    }

    initGride();

    return(
        <div className="gride" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            {createGride()}
        </div>
    )
}

export default GrideNodes;