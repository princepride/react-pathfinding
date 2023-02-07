import store from '../../store';

// const ISHORIZONTAL=true

const getStairWall = (SLOPE=1) => {
    const COLNUM=store.getState().COLNUM;
    const ROWNUM=store.getState().ROWNUM;
    let beginX=1;
    let res=[];
    for(let i=beginX;i<COLNUM;i++) {
        if(isEven(Math.floor(i*SLOPE/(ROWNUM-2))))
            res.push([i,Math.floor(i*SLOPE)%(ROWNUM-2)]);
        else{
            res.push([i,ROWNUM-2-Math.floor(i*SLOPE)%(ROWNUM-2)]);
        }
    }
    return res;
}

const isEven = (num) => {
    return num%2===0;
}

export default getStairWall;