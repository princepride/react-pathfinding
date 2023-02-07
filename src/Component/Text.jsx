import React from 'react';
import "./Text.css";

const Text=(props)=>{
    const {id, text} = props;
    return(
        <li>
            <div id={id} />
            <p>{text}</p>
        </li>
    )
}

export default Text;