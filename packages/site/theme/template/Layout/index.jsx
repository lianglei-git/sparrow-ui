
import React from 'react';
import H from './Header'
import '../../static/index.js'
// 编译器认识（package.json），webpack不认识...
import 'design/components/index'
import './loadstyle'
// if (Reflect.has(window.navigator, 'serviceWorker')) {
//     navigator.serviceWorker.register('/service-worker.js')
//         .then((registration) => {
//             window.registration = registration;
//             console.log('SW registered: ');
//             if (registration.waiting) {
//                 console.log('SW 需要更新')
//                 return;
//             }
//         }).catch(registrationError => {
//             window.registrationError = registrationError;
//             console.log('SW registration failed: ');
//         });
//     navigator.serviceWorker.ready.then((registration) => {
//         registration.update();
//         console.log('registration.update();')
//     });
// }
export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children } = this.props
        return <>
            <sp-affix offset-top="0" style={{ zIndex: '9', background: '#fff', width: '100%' }} className='sspp'><H></H></sp-affix>
            {children}
        </>
    }
}