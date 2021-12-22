import React ,{useState} from 'react';
import "./Node.css";

const Node = (props) => {
    const {
        col,
        row,
        isMouseDown,
        isBomb,
    } = props;

    const [isWall, setIsWall] = useState(false);

    const onMouseOver = (event) =>{
        if(isMouseDown)
            setIsWall(true);
    }

    return (
        <div
        key={`node-${row}-${col}`}
        className={`node ${isWall ? "node-wall" : ""} ${isBomb ? "node-bomb" : ""}`}
        onMouseOver={onMouseOver}
        ></div>
    );
}

export default Node;