
import React from 'react';
import H from './Header'
import '../../static/index.js'
import 'sparrow-ui'

import './loadstyle'
export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children } = this.props
        return <>
            <sp-affix offset-top="0" style={{zIndex: '9', background:'#fff'}} className='sspp'><H></H></sp-affix>
            {children}
        </>
    }
}