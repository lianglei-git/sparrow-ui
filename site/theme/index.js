const path = require('path');
const home = './template/Home/index.jsx';
const content = './template/Content/index.jsx';

module.exports = {
    plugins: [
        'bisheng-plugin-description',
        'bisheng-plugin-toc?maxDepth=2&keepElem',
        'bisheng-plugin-react?lang=tsx',//
    ],
    routes: {
        path: '/',
        component: './template/Layout/index.jsx',
        indexRoute: {component: home},
        childRoutes: [
            {
                path: 'components/:children/',
                component: content
            }
        ]
    }
}