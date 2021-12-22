import {createStore} from "redux";

let ROWNUM = 20;
let COLNUM = 60;

class Node{
    constructor(xCoordinates, yCoordinates){
        this.xCoordinates = xCoordinates;
        this.yCoordinates = yCoordinates;
    }
}

let nodes = [];

for(let i=0;i<COLNUM;i++){
    for(let j=0;j<ROWNUM;j++){
        let node = new Node(i,j);
        nodes.push(node);
    }
}


const setBombReducer = (state={nodes},action) => {
    switch(action.type){
        case "INITIAL_NODES":
            for(let i=0;i<ROWNUM;i++){
                for(let j=0;j<COLNUM;j++){
                    state.nodes[i*COLNUM+j].key=`node-${i}-${j}`;
                }
            }
            return {
                ...state,
            }
        case "SET_BOMB":
            return {
                ...state,
            }
        default:
            return state;
    }
}

const store = createStore(setBombReducer);

export default store;