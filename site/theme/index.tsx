
import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router , Route, Redirect} from 'react-router-dom'
import routes from './routers'
import {renderRoutes} from 'react-router-config'
import 'sparrow-ui'

ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
         <Router >
           {renderRoutes(routes)}
         </Router>
    </Suspense>,
    document.getElementById('root')
  );