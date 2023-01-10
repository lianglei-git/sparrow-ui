import React from 'react'
class AdapterReact {
    static createElement(tagName, props){
        return React.createElement(tagName, props, props.children);
    }
}

export default AdapterReact