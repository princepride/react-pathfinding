import React from 'react';
import Text from './Text';
import textNodes from './textNodes';
import "./MainText.css";

const MainText = () => {

    const createText = () => {
        const text = textNodes.map((text, index) => {
            return <div className="text">
                <Text key={index} id={text.id} text={text.text} />
                </div>
        })
        return text;
    }
    return (<div className="main-text">
        <ul>
            {createText()}
        </ul>
    </div>);
}

export default MainText;