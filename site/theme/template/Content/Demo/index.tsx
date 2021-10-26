import React from 'react';
import {Meta} from '../content'
import ReactDOM from 'react-dom';
interface Content  {
    ['desc-cn']?: string
    code?: string
    title: string
}
interface Props {
    content: Array<any>
    meta: Meta
}
class Demo extends React.Component<Props> {
    content:Content
    constructor(props:any) {
        super(props)
    }
    componentDidMount() {
        this.content = Object.create(null)
        this.content.title = this.props.meta.title
        // let b = new Function(this.props.content[3][2][1]);
        // let func = `function(React, ReactDOM){
        //     ${this.props.content[3][2][1]}
        // }`
        // console.log(eval(func)(React, ReactDOM))
    }   

    render() {
        console.log(this.props)
        return <section id="demo">
            <div className="introduce">
            {/* {eval("ReactDOM.render(\n  <div>\n   双击666\n   <sp-button>按钮点击</sp-button>\n  </div>,\n  mountNode,\n);")} */}
            </div>

            <div className="cmps_p">
            <h3>Content</h3>
            </div>
            

        </section>
    }
}

export default Demo