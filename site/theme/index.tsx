import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router , Route, Redirect} from 'react-router-dom'
// import Router from './routers'
import {renderRoutes} from 'react-router-config'
import Home from './template/Home/index'
import A from './template/Home/a'
import '../../components/index'
const routes = [
    {
        path: '/',
        component: Home,
        routes: [
            {  path: '/a', 
            exact: true,  
            component: A
            },
            {
                path: '/abb',
            component: () => <div>12821987912839</div>
            },
            {
                path: '/',
                exact: true,  
                render:() => <Redirect to={"/abb"} />
            }
        ]
    }
]
ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
         <Router >
           {renderRoutes(routes)}
         </Router>
    </Suspense>,
    document.getElementById('root')
  );