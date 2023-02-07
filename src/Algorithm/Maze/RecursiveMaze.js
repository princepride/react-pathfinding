import store from '../../store';

const getRecursiveMaze =()=>{
    const COLNUM=store.getState().COLNUM;
    const ROWNUM=store.getState().ROWNUM;
    let res=[];
    for(let i=0;i<COLNUM;i++){
        res.push([i,0]);
    }
    for(let i=0;i<ROWNUM;i++){
        res.push([0,i]);
    }
    for(let i=0;i<ROWNUM;i++){
        res.push([COLNUM-1,i]);
    }
    for(let i=0;i<COLNUM;i++){
        res.push([i,ROWNUM-1]);
    }
    recursive(1,COLNUM-2,1,ROWNUM-2,res);
    return res;
}

const recursive =(beginX,endX,beginY,endY,res) =>{
    if(endX>=beginX+2&&endY>=beginY+2){
        let pointX=Math.floor(Math.random()*(endX-beginX-1))+beginX+1;
        let pointY=Math.floor(Math.random()*(endY-beginY-1))+beginY+1;
        let walls=[];
        let temp=[];
        for(let i=beginX;i<pointX;i++){
            temp.push([i,pointY]);
        }
        walls.push(temp);
        temp=[];
        for(let i=pointX+1;i<=endX;i++){
            temp.push([i,pointY]);
        }
        walls.push(temp);
        temp=[];
        for(let i=beginY;i<pointY;i++){
            temp.push([pointX,i]);
        }
        walls.push(temp);
        temp=[];
        for(let i=beginY+1;i<=endY;i++){
            temp.push([pointX,i]);
        }
        walls.push(temp);
        let randWall=Math.floor(Math.random()*walls.length);
        for(let i=0;i<walls.length;i++){
            if(i!==randWall){
                let len=walls[i].length;
                walls[i].splice(Math.floor(Math.random()*len),1);
            }
        }
        res.push([pointX,pointY]);
        for(let i=0;i<walls.length;i++){
            for(let j=0;j<walls[i].length;j++){
                res.push(walls[i][j]);
            }
        }
        recursive(beginX,pointX-1,beginY,pointY-1,res);
        recursive(beginX,pointX-1,pointY+1,endY,res);
        recursive(pointX+1,endX,beginY,pointY-1,res);
        recursive(pointX+1,endX,pointY+1,endY,res);
    }

}

export default getRecursiveMaze;