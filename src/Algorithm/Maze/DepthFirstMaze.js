import store from '../../store';

const setWallOfDepthFirstMaze = () =>{
    const COLNUM=store.getState().COLNUM;
    const ROWNUM=store.getState().ROWNUM;
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
    
}

export {setWallOfDepthFirstMaze,deletetWallOfDepthFirstMaze};