
import React from 'react';
import H from './Header'
import '../../static/index.js'
import 'sparrow-ui'
import './loadstyle'
if (Reflect.has(window.navigator, 'serviceWorker')) {
    navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
        window.registration = registration;
        console.log('SW registered: ');
    }).catch(registrationError => {
        window.registrationError = registrationError;
        console.log('SW registration failed: ');
      });
}
export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children } = this.props
        return <>
            <sp-affix offset-top="0" style={{zIndex: '9', background:'#fff', width: '100%'}} className='sspp'><H></H></sp-affix>
            {children}
        </>
    }
}