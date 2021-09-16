import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
// import {HashRouter as Router ,Redirect} from 'react-router-dom'
import Router from './routers'

ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
         <Router ></Router>
    </Suspense>,
    document.getElementById('root')
  );