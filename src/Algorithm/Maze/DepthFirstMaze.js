import store from '../../store';

const COLNUM=store.getState().COLNUM;
const ROWNUM=store.getState().ROWNUM;
const CHAMBERCOL=Math.floor(COLNUM/2);//x
const CHAMBERROW=Math.floor(ROWNUM/2);//y
let visitedNum = 0;

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
    let visitedNodes=new Array(CHAMBERCOL*CHAMBERROW).fill(false);
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
    visitedNum ++;
    dfs(visitedNodes,0,0,res);
    return res;
}

const dfs=(visitedNodes,x,y,res) =>{
    if(visitedNum<CHAMBERCOL*CHAMBERROW){
        let array=[];
        if(!visitedNodes[y*CHAMBERCOL+x-1]){
            array.push(0);
        }
        if(!visitedNodes[y*CHAMBERCOL+x+1]){
            array.push(1);
        }
        if(!visitedNodes[(y-1)*CHAMBERCOL+x]){
            array.push(2);
        }
        if(!visitedNodes[(y+1)*CHAMBERCOL+x]){
            array.push(3);
        }
        if(array.length>0){
            let rand = Math.floor(Math.random()*array.length);
            if(x-1>=0 && array[rand]===0){
                visitedNodes[y*CHAMBERCOL+x-1]=true;
                // visitedHasUnvisted.push([x-1,y]);
                res.push([2*x,2*y+1]);
                visitedNum++;
                dfs(visitedNodes,x-1,y,res);
                dfs(visitedNodes,x,y,res);
            }
            if(x+1<CHAMBERCOL && array[rand]===1){
                visitedNodes[y*CHAMBERCOL+x+1]=true;
                // visitedHasUnvisted.push([x-1,y]);
                res.push([2*x+2,2*y+1]);
                visitedNum++;
                dfs(visitedNodes,x+1,y,res);
                dfs(visitedNodes,x,y,res);
            }
            if(y-1>=0 && array[rand]===2){
                visitedNodes[(y-1)*CHAMBERCOL+x]=true;
                // visitedHasUnvisted.push([x-1,y]);
                res.push([2*x+1,2*y]);
                visitedNum++;
                dfs(visitedNodes,x,y-1,res);
                dfs(visitedNodes,x,y,res);
            }
            if(y+1<CHAMBERROW && array[rand]===3){
                visitedNodes[(y-1)*CHAMBERCOL+x]=true;
                // visitedHasUnvisted.push([x-1,y]);
                res.push([2*x+1,2*y+2]);
                visitedNum++;
                dfs(visitedNodes,x-1,y,res);
                dfs(visitedNodes,x,y,res);
            }
        }
    }
}

export {setWallOfDepthFirstMaze,deletetWallOfDepthFirstMaze};