
import React from 'react';
import 'sparrow-ui'
import H from './Header'
import '../../static/index.js'
export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children } = this.props
        return <>
            <sp-affix offset-top="0" style={{zIndex: '9', background:'#fff'}}><H></H></sp-affix>
            {children}
        </>
    }
}