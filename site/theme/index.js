const path = require('path');
const home = './template/Home/index.jsx';
const content = './template/Content/index.jsx';
const docs = './template/Docs/index.jsx'
module.exports = {
    plugins: [
        'bisheng-plugin-description',
        'bisheng-plugin-toc?maxDepth=2&keepElem',
        '@ant-design/bisheng-plugin?injectProvider',
        'bisheng-plugin-react?lang=__react',
    ],
    // pick: {
    //     components(markdownData) {
    //         console.log(markdownData)
    //       const { filename } = markdownData.meta;
    //       if (!/^components/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
    //         return null;
    //       }
    //       return {
    //         meta: markdownData.meta,
    //       };
    //     },
    //     changelog(markdownData) {
    //       if (/CHANGELOG/.test(markdownData.meta.filename)) {
    //         return {
    //           meta: markdownData.meta,
    //         };
    //       }
    //       return null;
    //     },
    //     // 'docs/react': pickerGenerator('react'),
    //     // 'docs/spec': pickerGenerator('spec'),
    //   },
    routes: {
        path: '/',
        component: './template/Layout/index.jsx',
        indexRoute: {component: home},
        childRoutes: [
            {
                path: 'components/:children/',
                component: content
            },
            {
                path: 'docs/react/:children/',
                component: content
            }
        ]
    }
}