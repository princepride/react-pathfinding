import store from "../store";
const dijkstra = () => {
    let ROWNUM = store.getState().ROWNUM;//y
    let COLNUM = store.getState().COLNUM;//x
    console.log(ROWNUM*COLNUM);
    const visitedNodeInorder = [];
    const visitedNodes= new Array(ROWNUM*COLNUM).fill(false);
    const xStart = 0;
    const yStart = 0;
    for(let i = 0; i < ROWNUM.length;i++){
        for(let j=0; j < COLNUM; j++){
            if(store.getState().nodes[i*COLNUM + j].isStart){
                xStart = j;
                yStart = i;
            }
        }
    }
    const query = [store.getState().nodes[yStart*COLNUM + xStart]];
    while(query.length > 0){
        let tempNodes=query[0];
        let tempIndex=0;
        for(let i=1; i<query.length; i++){
            if(tempNodes.distance<query[i].distance){
                tempNodes=query[i];
                tempIndex=i;
            }
        }
        let node=query.splice(0,tempIndex);
        visitedNodeInorder.push(node);
        if(node.isTarget){
            return visitedNodeInorder;
        }
        if(node.xCoordinates-1>=0&&node.yCoordinates-1>=0){
            let x = node.xCoordinates-1;
            let y = node.yCoordinates-1;
            if(store.getState().nodes[y*COLNUM+x].isWall){
                continue;
            }
            if(!visitedNodes[y*COLNUM+x]){
                visitedNodes[y*COLNUM+x] = true;
                store.getState().nodes[y*COLNUM+x].forwardNode=node;
                query.push(store.getState().nodes[y*COLNUM+x]);
            }
        }
        if(node.xCoordinates-1>=0&&node.yCoordinates+1<ROWNUM){
            let x=node.xCoordinates-1;
            let y=node.yCoordinates+1;
            if(store.getState().nodes[y*COLNUM+x].isWall){
                continue;
            }
            if(!visitedNodes[y*COLNUM+x]){
                visitedNodes[y*COLNUM+x] = true;
                store.getState().nodes[y*COLNUM+x].forwardNode=node;
                query.push(store.getState().nodes[y*COLNUM+x]);
            }
        }
        if(node.xCoordinates+1<COLNUM&&node.yCoordinates+1<ROWNUM){
            let x=node.xCoordinates+1;
            let y=node.yCoordinates+1;
            if(store.getState().nodes[y*COLNUM+x].isWall){
                continue;
            }
            if(!visitedNodes[y*COLNUM+x]){
                visitedNodes[y*COLNUM+x] = true;
                store.getState().nodes[y*COLNUM+x].forwardNode=node;
                query.push(store.getState().nodes[y*COLNUM+x]);
            }
        }
        if(node.xCoordinates+1<COLNUM&&node.yCoordinates-1>=0){
            let x=node.xCoordinates+1;
            let y=node.yCoordinates-1;
            if(store.getState().nodes[y*COLNUM+x].isWall){
                continue;
            }
            if(!visitedNodes[y*COLNUM+x]){
                visitedNodes[y*COLNUM+x] = true;
                store.getState().nodes[y*COLNUM+x].forwardNode=node;
                query.push(store.getState().nodes[y*COLNUM+x]);
            }
        }
    }
    return visitedNodeInorder;
}

export default dijkstra;