import getStairWall from './SimpleStair';

const getRandomMaze = ()=>{
    let a = Math.floor(3*Math.random())+3;
    let b = Math.floor(3*Math.random())+6;
    let c = Math.floor(3*Math.random())+9;
    let d = Math.floor(3*Math.random())+12;
    let res = getStairWall(a);
    res = res.concat(getStairWall(b));
    res = res.concat(getStairWall(c));
    res = res.concat(getStairWall(d));
    return res;
}

export default getRandomMaze;