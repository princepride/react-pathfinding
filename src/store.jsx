import {createStore} from "redux";

let ROWNUM = 20;
let COLNUM = 60;

class Node{
    isWall = false;
    key = "";
    constructor(xCoordinates, yCoordinates){
        this.xCoordinates = xCoordinates;
        this.yCoordinates = yCoordinates;
    }
}

// let nodes=[];

// for(let i=0;i<ROWNUM;i++){
//     for(let j=0;j<COLNUM;j++){
//         let node = new Node(j,i);
//         nodes.isWall = false;
//         nodes.push(node);
//     }
// }

const setBombReducer = (state={nodes:[],isMouseDown:false,ROWNUM:ROWNUM,COLNUM:COLNUM,},action) => {
    switch(action.type){
        case "INITIAL_NODES":
            state.nodes=[];
            for(let i=0;i<state.ROWNUM;i++){
                for(let j=0;j<state.COLNUM;j++){
                    let node = new Node(j,i);
                    node.key=`node-${i}-${j}`;
                    state.nodes.push(node);
                    // console.log(state.nodes[i*state.COLNUM+j].key);
                }
            }
            return {
                ...state,
            }
        case "SET_BOMB":
            return {
                ...state,
            }
        case "SET_WALL":
            let x=action.xCoordinates;
            let y=action.yCoordinates;
            state.nodes[y*state.COLNUM+x].isWall=true;
        case "MOUSE_DOWN":
            state.isMouseDown = true;
            return {
                ...state,
            }
        case "MOUSE_UP":
            state.isMouseDown = false;
            return {
                ...state,
            }
        default:
            return state;
    }
}

const store = createStore(setBombReducer);

export default store;