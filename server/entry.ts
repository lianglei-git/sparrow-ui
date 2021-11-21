// @ts-nocheck
const http = require('http');

var fs = require("fs");

var url = require('url');

var routes = require('./routes/index.ts');

var has = Reflect.has
// lib的排除文件如果不能使用的话； 解决方案
// 1. 重新组装index.js
// 2. 写一个rollup的插件 
const server = http.createServer((req, res) => {
    var urlPath = url.parse(req.url);
    var meth = req.method.toLocaleLowerCase();
    res.setHeader('Content-Type', 'text/json;charset=utf-8');
    has(routes, meth) ?
        has(routes[meth], urlPath.pathname) ?
            routes[meth][urlPath.pathname](req, res) :
            res.write('不存在'+urlPath.pathname+'此API!') :
        res.write('不存在'+meth+'此METH!') ;
    res.end()
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8214, () => {
    console.log('server:::8214')
});