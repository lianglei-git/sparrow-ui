
import React from 'react';
import '../../../../components'


export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {children} = this.props
        return <div> 

            layout  入口
            {children}
        </div>
    }
}