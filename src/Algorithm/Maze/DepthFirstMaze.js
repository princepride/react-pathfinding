import store from '../../store';

const COLNUM=store.getState().COLNUM;
const ROWNUM=store.getState().ROWNUM;
const CHAMBERCOL=COLNUM/2;//x
const CHAMBERROW=ROWNUM/2;//y
let visitedNum = 0;
let visitedHasUnvisted = [];

const setWallOfDepthFirstMaze = () =>{
    let res=[];
    for(let j=0;j<ROWNUM;j=j+2){
        for(let i=0;i<COLNUM;i++){
            res.push([i,j]);
        }
    }
    for(let i=0;i<COLNUM;i=i+2){
        for(let j=0;j<ROWNUM;j++){
            res.push([i,j]);
        }
    }
    return res;
}

const deletetWallOfDepthFirstMaze = () =>{
    let res=[];
    let visitedNodes=new Array (CHAMBERCOL*CHAMBERROW).fill(false);
    let startX = 0, startY = 0, targetX = 0, targetY = 0;
    for(let i=0; i<ROWNUM; i++){
        for(let j=0; j<COLNUM; j++){
            if(store.getState().nodes[i*COLNUM+j].isStart){
                startX = j;
                startY = i;
            }
            if(store.getState().nodes[i*COLNUM+j].isTarget){
                targetX = j;
                targetY = i;
            }
        }
    }
    // visitedHasUnvisted.push([0,0]);
    // while(visitedNum<CHAMBERCOL*CHAMBERROW){
    //     for(let i=0; i<visitedHasUnvisted.length; i++){
    //         dfs(visitedNodes,visitedHasUnvisted[i].x,visitedHasUnvisted[i].y,res);
    //     }
        
    // }
    dfs(visitedNodes,0,0,res);
}

const dfs=(visitedNodes,x,y,res) =>{
    let rand = Math.floor(Math.random()*4);
    if(x-1>=0 && !visitedNodes[y*CHAMBERCOL+x-1]){
        visitedNodes[y*CHAMBERCOL+x-1]=true;
        // visitedHasUnvisted.push([x-1,y]);
        res.push([2*x,2*y+1]);
        visitedNum++;
        dfs(visitedNodes,x-1,y,res);
    }
    if(x+1<CHAMBERCOL && !visitedNodes[y*CHAMBERCOL+x+1]){
        visitedNodes[y*CHAMBERCOL+x+1]=true;
        // visitedHasUnvisted.push([x-1,y]);
        res.push([2*x+2,2*y+1]);
        visitedNum++;
        dfs(visitedNodes,x+1,y,res);
    }
    if(y-1>=0 && !visitedNodes[(y-1)*CHAMBERCOL+x]){
        visitedNodes[(y-1)*CHAMBERCOL+x]=true;
        // visitedHasUnvisted.push([x-1,y]);
        res.push([2*x+1,2*y]);
        visitedNum++;
        dfs(visitedNodes,x,y-1,res);
    }
    if(y+1<CHAMBERROW && !visitedNodes[(y+1)*CHAMBERCOL+x]){
        visitedNodes[(y-1)*CHAMBERCOL+x]=true;
        // visitedHasUnvisted.push([x-1,y]);
        res.push([2*x+1,2*y+2]);
        visitedNum++;
        dfs(visitedNodes,x-1,y,res);
    }
}

export {setWallOfDepthFirstMaze,deletetWallOfDepthFirstMaze};