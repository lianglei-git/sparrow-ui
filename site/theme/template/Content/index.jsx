import React from 'react';
import collect from 'bisheng/collect';
import Main from './content'
export default collect((nextProps) => { 
    // 这里基本已经成型
    let {pathname} = nextProps.location;
    let pageDataPath = pathname.split('/');
    let pageData =  nextProps.utils.get(nextProps.data, pageDataPath);
    if (!pageData) {
        throw 404; // eslint-disable-line no-throw-literal
      }
      console.log(pageData)
    return Promise.resolve({...pageData})// 这段回掉注入参数 多半是react的源码。要查看一下在bisheng/tmp里面的routers.index.js的文件
})(Main)