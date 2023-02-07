import {createStore} from "redux";
// import dijkstra from "./Algorithm/Dijkstra";

const ROWNUM = 29;
const COLNUM = 71;
let startCoordinates = [Math.floor(COLNUM/4),Math.floor(ROWNUM/2)]
let targetCoordinates = [Math.floor(COLNUM*3/4),Math.floor(ROWNUM/2)]

class Node{
    isWall = false;
    key = "";
    isStart=false;
    isTarget=false;
    isBomb=false;
    distance=Infinity;
    forwardNode=null;
    isVisited=false;
    isPath=false;
    constructor(xCoordinates, yCoordinates){
        this.xCoordinates = xCoordinates;
        this.yCoordinates = yCoordinates;
        if(xCoordinates===startCoordinates[0] && yCoordinates===startCoordinates[1]){
            this.isStart=true;
            this.distance=0;
        }
        if(xCoordinates===targetCoordinates[0] && yCoordinates===targetCoordinates[1]){
            this.isTarget=true;
        }
    }
}

const Reducer = (state={nodes:[],
    isMouseDown:false,
    ROWNUM:ROWNUM,
    COLNUM:COLNUM,
    isAdjusting:false,
    deletedProp:[],
    isAlgorithming:[],
    hasBomb:false,},action) => {
    switch(action.type){
        case "INITIAL_BOARD":
            state.nodes=[];
            for(let i=0;i<state.ROWNUM;i++){
                for(let j=0;j<state.COLNUM;j++){
                    let node = new Node(j,i);
                    node.key=`node-${i}-${j}`;
                    state.nodes.push(node);
                }
            }
            return {
                ...state,
            }
        case "CLEAR_WALL_WEIGHTS":
            for(let i=0;i<state.ROWNUM;i++){
                for(let j=0;j<state.COLNUM;j++){
                    state.nodes[i*state.COLNUM+j].isWall=false;
                }
            }
            return {
                ...state,
            }
        case "CLEAR_BOMB":
            for(let i=0;i<state.ROWNUM;i++){
                for(let j=0;j<state.COLNUM;j++){
                    state.nodes[i*state.COLNUM+j].isBomb=false;
                }
            }
            return {
                ...state,
            }
        case "CLEAR_PATH":
            for(let i=0;i<state.ROWNUM;i++){
                for(let j=0;j<state.COLNUM;j++){
                    state.nodes[i*state.COLNUM+j].isVisited=false;
                    state.nodes[i*state.COLNUM+j].isPath=false;
                    state.nodes[i*state.COLNUM+j].forwardNode=null;
                    state.isAlgorithming=[];
                }
            }
            return {
                ...state,
            }
        case "INITIAL_BOMB":
            state.nodes[Math.floor(ROWNUM/2)*COLNUM+Math.floor(COLNUM/2)].isBomb=true;
            // console.log(state.nodes[Math.floor(ROWNUM/2)*COLNUM+Math.floor(COLNUM/2)].isBomb);
            return {
                ...state,
            }
        case "SET_WALL":
            let x=action.xCoordinates;
            let y=action.yCoordinates;
            if(!state.nodes[y*state.COLNUM+x].isStart && !state.nodes[y*state.COLNUM+x].isTarget){
                state.nodes[y*state.COLNUM+x].isWall=true;
            }
            return{
                ...state,
            }
        case "SET_START":
            let x1=action.xCoordinates;
            let y1=action.yCoordinates;
            state.nodes[y1*state.COLNUM+x1].isStart=true;
            state.isAdjusting=false;
            state.deletedProp=[];
            return{
                ...state,
            }
        case "SET_TARGET":
            let x2=action.xCoordinates;
            let y2=action.yCoordinates;
            state.nodes[y2*state.COLNUM+x2].isTarget=true;
            state.isAdjusting=false;
            state.deletedProp=[];
            return{
                ...state,
            }
        case "SET_BOMB":
            let x6=action.xCoordinates;
            let y6=action.yCoordinates;
            state.nodes[y6*state.COLNUM+x6].isBomb=true;
            state.isAdjusting=false;
            state.deletedProp=[];
            return{
                ...state,
            }
        case "SET_PATH":
            let x9=action.xCoordinates;
            let y9=action.yCoordinates;
            state.nodes[y9*state.COLNUM+x9].isPath=true;
            return{
                ...state,
            }
        case "SET_ALGORITHM":
            state.isAlgorithming.push(action.algorithm);
            return{
                ...state,
            }
        case "DELETE_START":
            let x3=action.xCoordinates;
            let y3=action.yCoordinates;
            state.nodes[y3*state.COLNUM+x3].isStart=false;
            state.isAdjusting=true;
            state.deletedProp.push("SET_START");
            return{
                ...state,
            }
        case "DELETE_TARGET":
            let x4=action.xCoordinates;
            let y4=action.yCoordinates;
            state.nodes[y4*state.COLNUM+x4].isTarget=false;
            state.isAdjusting=true;
            state.deletedProp.push("SET_TARGET");
            return{
                ...state,
            }
        case "DELETE_BOMB":
            let x5=action.xCoordinates;
            let y5=action.yCoordinates;
            state.nodes[y5*state.COLNUM+x5].isBomb=false;
            state.isAdjusting=true;
            state.deletedProp.push("SET_BOMB");
            return{
                ...state,
            }
        case "DELETE_SIGNAL_WALL":
            let x7=action.xCoordinates;
            let y7=action.yCoordinates;
            state.nodes[y7*state.COLNUM+x7].isWall=false;
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

        case "ANIMATE_PATHFINDING":
            let x8=action.xCoordinates;
            let y8=action.yCoordinates;
            state.nodes[y8*state.COLNUM+x8].isVisited=true;
            return {
                ...state,
            }
        default:
            return state;
    }
}

const store = createStore(Reducer);

export default store;