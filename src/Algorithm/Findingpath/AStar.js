import store from "../../store";
const aStar = () => {
    let ROWNUM = store.getState().ROWNUM;//y
    let COLNUM = store.getState().COLNUM;//x
    const visitedNodeInorder = [];
    const visitedNodes= new Array(ROWNUM*COLNUM).fill(false);
    let xStart=0;
    let yStart=0;
    let xTarget = 0;
    let yTarget = 0;
    // find the start point
    for(let i = 0; i < ROWNUM;i++){
        for(let j=0; j < COLNUM; j++){
            if(store.getState().nodes[i*COLNUM + j].isStart){
                xStart = j;
                yStart = i;
            }
            else if(store.getState().nodes[i*COLNUM + j].isTarget){
                xTarget = j;
                yTarget = i;
            }
        }
    }
    let hArray = [];
    for (let i=0; i < ROWNUM; i++){
        let tempArray = [];
        for(let j=0; j < COLNUM; j++){
            tempArray.push(Math.abs(yTarget-i)+Math.abs(xTarget-j));
        }
        hArray.push(tempArray);
    }
    console.log(hArray);
    //query 不断的把F最小的点弹出来，访问过的点不放入query中
    const query = [store.getState().nodes[yStart*COLNUM + xStart]];
    store.getState().nodes[yStart*COLNUM + xStart].distance = 0;
    ////输出的访问点集
    //visitedNodeInorder.push(store.getState().nodes[yStart*COLNUM + xStart]);
    ////访问过直接设为true
    //visitedNodes[yStart*COLNUM+xStart] = true;
    while(query.length > 0){
        query.sort((a,b) => (hArray[a.yCoordinates][a.xCoordinates]+a.distance - b.distance- hArray[b.yCoordinates][b.xCoordinates]));
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

export default aStar;