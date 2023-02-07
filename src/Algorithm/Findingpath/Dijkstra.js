import store from "../../store";
const dijkstra = () => {
    let ROWNUM = store.getState().ROWNUM;//y
    let COLNUM = store.getState().COLNUM;//x
    const visitedNodeInorder = [];
    const visitedNodes= new Array(ROWNUM*COLNUM).fill(false);
    let xStart=0;
    let yStart=0;
    for(let i = 0; i < ROWNUM;i++){
        for(let j=0; j < COLNUM; j++){
            if(store.getState().nodes[i*COLNUM + j].isStart){
                xStart = j;
                yStart = i;
            }
        }
    }
    const query = [store.getState().nodes[yStart*COLNUM + xStart]];
    while(query.length > 0){
        // if(visitedNodeInorder.length>=100){
        //     break;
        // }
        query.sort((a,b) => a.distance - b.distance);
        let node=query.shift();
        visitedNodeInorder.push(node);
        if(node.isTarget){
            return visitedNodeInorder;
        }
        if(node.xCoordinates-1>=0){
            let x = node.xCoordinates-1;
            let y = node.yCoordinates;
            if(!store.getState().nodes[y*COLNUM+x].isWall){
                if(!visitedNodes[y*COLNUM+x]){
                    // visitedNodes[y*COLNUM+x] = true;
                    store.getState().nodes[y*COLNUM+x].forwardNode=node;
                    store.getState().nodes[y*COLNUM+x].distance = node.distance + 1;
                    visitedNodes[y*COLNUM+x] = true;
                    query.push(store.getState().nodes[y*COLNUM+x]);
                }
            }
        }
        if(node.yCoordinates+1<ROWNUM){
            let x=node.xCoordinates;
            let y=node.yCoordinates+1;
            if(!store.getState().nodes[y*COLNUM+x].isWall){
                if(!visitedNodes[y*COLNUM+x]){
                    // visitedNodes[y*COLNUM+x] = true;
                    store.getState().nodes[y*COLNUM+x].forwardNode=node;
                    store.getState().nodes[y*COLNUM+x].distance = node.distance + 1;
                    visitedNodes[y*COLNUM+x] = true;
                    query.push(store.getState().nodes[y*COLNUM+x]);
                }
            }
        }
        if(node.xCoordinates+1<COLNUM){
            let x=node.xCoordinates+1;
            let y=node.yCoordinates;
            if(!store.getState().nodes[y*COLNUM+x].isWall){
                if(!visitedNodes[y*COLNUM+x]){
                    // visitedNodes[y*COLNUM+x] = true;
                    store.getState().nodes[y*COLNUM+x].forwardNode=node;
                    store.getState().nodes[y*COLNUM+x].distance = node.distance + 1;
                    visitedNodes[y*COLNUM+x] = true;
                    query.push(store.getState().nodes[y*COLNUM+x]);
                }
            }
        }
        if(node.yCoordinates-1>=0){
            let x=node.xCoordinates;
            let y=node.yCoordinates-1;
            if(!store.getState().nodes[y*COLNUM+x].isWall){
                if(!visitedNodes[y*COLNUM+x]){
                    // visitedNodes[y*COLNUM+x] = true;
                    store.getState().nodes[y*COLNUM+x].forwardNode=node;
                    store.getState().nodes[y*COLNUM+x].distance = node.distance + 1;
                    visitedNodes[y*COLNUM+x] = true;
                    query.push(store.getState().nodes[y*COLNUM+x]);
                }
            }
        }
    }
    return visitedNodeInorder;
}

export default dijkstra;