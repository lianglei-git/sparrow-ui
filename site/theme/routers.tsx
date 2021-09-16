import React from 'react'
import { lazy } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from './template/Home/index'
import A from './template/Home/a'

// const routes = [
//     {
//         title: 'login',
//         name: 'login',
//         path: '/login',
//         component: Login
//     },
//     {
//         title: 'blog',
//         name: 'blog',
//         path: '/blog',
//         children: [
//             {
//                 title: 'list',
//                 name: 'blog-list',
//                 path: '/blog/list',
//                 component: BlogList
//             },
//         ]
//     },
// ]




const routes = [
    {
        path: '/',        
        component: Home,

    },
    {
        path:'/home',
        component: Home,
        routes: [
            {path: '/abb',
            component: A
            }
        ]
    },
    {
        path:'oos',
        component: A
    },
]

const beforeEach = (route:any, auth:any) => {
  // if (route.name !== 'login') {
  //   if (!auth.token) {
  //     return <Redirect to="/login"></Redirect>
  //   }
  // }
  return <route.component />
}

const RouteView: React.FC = () => {
  const getRouteRecursion = (v:any) => {
    return v.map((v:any) => {
      return (
        <Route key={v.name} path={v.path}>
          {v.routes ? getRouteRecursion(v.routes) : beforeEach(v, {})}
        </Route>
      )
    })
  }
  
  return (
    <HashRouter>
      {/* <Switch>{getRouteRecursion(routes)}
       
      </Switch> */}
      <Route  path='/' component={Home}> </Route>
    </HashRouter>
  )
}

export default RouteView

