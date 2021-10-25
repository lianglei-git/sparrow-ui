
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
            <H></H>
            {children}
        </>
    }
}