// @ts-nocheck
const http = require('http');

var fs = require("fs");

var url = require('url');

var routes = require('./routes/index.js');

var has = Reflect.has;
var ispromise = target => {
    return !!target && target.constructor.name == 'Promise' && typeof target.then == 'function'
}
// lib的排除文件如果不能使用的话； 解决方案
// 1. 重新组装index.js
// 2. 写一个rollup的插件 
const server = http.createServer((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
        });
        res.end();
        return
    }
    var urlPath = url.parse(req.url);
    var meth = req.method.toLocaleLowerCase();
    res.setHeader('Content-Type', 'text/json;charset=utf-8');
    let _promise = has(routes, meth) ?
        has(routes[meth], urlPath.pathname) ?
            routes[meth][urlPath.pathname](req, res) :
            res.write(JSON.stringify({ msg: '不存在' + urlPath.pathname + '此API!', status: 404 })) :
        res.write(JSON.stringify({ msg: '不存在' + meth + '此METH!' }));
    ispromise(_promise) ?
        _promise.then(res.end).catch(rej => {
            console.log(rej)
        })
        : _promise ? '' :res.end(null)

});


server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8214, () => {
    console.log('server:::8214')
});