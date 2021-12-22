import React from 'react';
import Text from './Text';
import textNodes from './textNodes';
import "./MainText.css";

const MainText = () => {

    const createText = () => {
        const text = textNodes.map((text, index) => {
            return <Text key={index} id={text.id} text={text.text} />
        })
        return text;
    }
    return (<div className="MainText">
        <ul>
            {createText()}
        </ul>
    </div>);
}

export default MainText;