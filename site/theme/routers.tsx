import React, { Suspense } from 'react'
import { HashRouter as Router, Redirect } from 'react-router-dom'
import Home from './template/Home/index'
import A from './template/Home/a'
import { RouteConfigComponentProps } from 'react-router-config'
import { Location } from 'history';
export interface RouteConfig {
    key?: React.Key | undefined;
    location?: Location | undefined;
    component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType | undefined;
    path?: string | string[] | undefined;
    exact?: boolean | undefined;
    strict?: boolean | undefined;
    routes?: RouteConfig[] | undefined;
    render?: ((props: RouteConfigComponentProps<any>) => React.ReactNode) | undefined;
    [propName: string]: any;
}


export default [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/a',
                exact: true,
                component: A
            },
            {
                path: '/',
                exact: true,
                render: () => <Redirect to={"/a"} />
            }
        ]
    }
] as unknown as RouteConfig[]