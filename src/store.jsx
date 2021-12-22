import {createStore} from "redux";

let ROWNUM = 30;
let COLNUM = 70;
let startCoordinates = [Math.floor(COLNUM/4),Math.floor(ROWNUM/2)]
let targetCoordinates = [Math.floor(COLNUM*3/4),Math.floor(ROWNUM/2)]

class Node{
    isWall = false;
    key = "";
    isStart=false;
    isTarget=false;
    constructor(xCoordinates, yCoordinates){
        this.xCoordinates = xCoordinates;
        this.yCoordinates = yCoordinates;
        console.log(xCoordinates+" "+yCoordinates);
        if(xCoordinates===startCoordinates[0] && yCoordinates===startCoordinates[1]){
            this.isStart=true;
            // console.log("Start"+xCoordinates+" "+yCoordinates);
        }
        if(xCoordinates===targetCoordinates[0] && yCoordinates===targetCoordinates[1]){
            this.isTarget=true;
            // console.log("Target"+xCoordinates+" "+yCoordinates);
        }
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

const setBombReducer = (state={nodes:[],
    isMouseDown:false,
    ROWNUM:ROWNUM,
    COLNUM:COLNUM,
    start:startCoordinates,
    target:targetCoordinates},action) => {
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
            return{
                ...state,
            }
        case "SET_START":
            let x1=action.xCoordinates;
            let y1=action.yCoordinates;
            state.start=[x1,y1];
            return{
                ...state,
            }
        case "SET_TARGET":
            let x2=action.xCoordinates;
            let y2=action.yCoordinates;
            state.target=[x2,y2];
            return{
                ...state,
            }
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