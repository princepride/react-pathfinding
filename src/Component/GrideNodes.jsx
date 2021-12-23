import React from 'react';
import Node from './Node';
import "./GrideNodes.css";
import store from '../store';


const GrideNodes = (props) => {

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
                />);
            }
            gride.push(<div className="node-row" key={`row-${i}`}>{row}</div>);
        }
        return gride;
    }

    const initGride=()=>{
        store.dispatch({type:"INITIAL_BOARD"});
    }

    initGride();

    return(
        <div className="gride">
            {createGride()}
        </div>
    )
}

export default GrideNodes;